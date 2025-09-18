-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  website_url TEXT,
  skills TEXT[],
  experience_level TEXT CHECK (experience_level IN ('junior', 'pleno', 'senior', 'especialista')),
  salary_expectation INTEGER,
  available_for_work BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  job_type TEXT CHECK (job_type IN ('presencial', 'remoto', 'hibrido')) DEFAULT 'presencial',
  contract_type TEXT CHECK (contract_type IN ('clt', 'pj', 'estagio', 'freelancer')) DEFAULT 'clt',
  experience_level TEXT CHECK (experience_level IN ('junior', 'pleno', 'senior', 'especialista')),
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('enviada', 'em_analise', 'aprovada', 'rejeitada')) DEFAULT 'enviada',
  cover_letter TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Create saved_jobs table
CREATE TABLE public.saved_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, job_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for jobs
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs FOR SELECT USING (is_active = true);

-- Policies for applications
CREATE POLICY "Users can view their own applications" ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications" ON public.applications FOR UPDATE USING (auth.uid() = user_id);

-- Policies for saved_jobs
CREATE POLICY "Users can view their own saved jobs" ON public.saved_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save jobs" ON public.saved_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove saved jobs" ON public.saved_jobs FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample jobs data
INSERT INTO public.jobs (title, company, location, salary_min, salary_max, description, requirements, job_type, contract_type, experience_level, tags, is_featured) VALUES
('Desenvolvedor Frontend React', 'TechCorp', 'São Paulo, SP', 5000, 8000, 'Desenvolvedor React sênior para projeto inovador', 'React, TypeScript, 3+ anos experiência', 'hibrido', 'clt', 'senior', ARRAY['react', 'typescript', 'frontend'], true),
('Designer UX/UI', 'DesignStudio', 'Rio de Janeiro, RJ', 4000, 7000, 'Designer para criar experiências incríveis', 'Figma, Adobe XD, portfolio', 'remoto', 'pj', 'pleno', ARRAY['design', 'ux', 'ui'], true),
('Desenvolvedor Full Stack', 'StartupTech', 'Remoto', 6000, 10000, 'Full stack para aplicações web modernas', 'Node.js, React, PostgreSQL', 'remoto', 'clt', 'senior', ARRAY['fullstack', 'nodejs', 'react'], false),
('Analista de Dados', 'DataCorp', 'Belo Horizonte, MG', 4500, 7500, 'Análise de dados e business intelligence', 'Python, SQL, Power BI', 'presencial', 'clt', 'pleno', ARRAY['dados', 'python', 'sql'], false);