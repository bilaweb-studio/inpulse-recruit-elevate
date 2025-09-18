import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  requirements?: string;
  benefits?: string;
  job_type: 'presencial' | 'remoto' | 'hibrido';
  contract_type: 'clt' | 'pj' | 'estagio' | 'freelancer';
  experience_level?: 'junior' | 'pleno' | 'senior' | 'especialista';
  tags?: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchJobs = async (filters?: {
    search?: string;
    location?: string;
    jobType?: string;
    experienceLevel?: string;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.location && filters.location !== 'all') {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.jobType && filters.jobType !== 'all') {
        query = query.eq('job_type', filters.jobType);
      }

      if (filters?.experienceLevel && filters.experienceLevel !== 'all') {
        query = query.eq('experience_level', filters.experienceLevel);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setJobs((data as Job[]) || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar vagas');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId: string, coverLetter?: string) => {
    if (!user) return { error: { message: 'Usuário não autenticado' } };

    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          job_id: jobId,
          cover_letter: coverLetter,
        });

      return { error };
    } catch (err) {
      return { error: { message: 'Erro ao enviar candidatura' } };
    }
  };

  const saveJob = async (jobId: string) => {
    if (!user) return { error: { message: 'Usuário não autenticado' } };

    try {
      const { error } = await supabase
        .from('saved_jobs')
        .insert({
          user_id: user.id,
          job_id: jobId,
        });

      return { error };
    } catch (err) {
      return { error: { message: 'Erro ao salvar vaga' } };
    }
  };

  const unsaveJob = async (jobId: string) => {
    if (!user) return { error: { message: 'Usuário não autenticado' } };

    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_id', user.id)
        .eq('job_id', jobId);

      return { error };
    } catch (err) {
      return { error: { message: 'Erro ao remover vaga salva' } };
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    applyToJob,
    saveJob,
    unsaveJob,
  };
}