-- Create sparks table
CREATE TABLE IF NOT EXISTS sparks (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Core concept fields
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  pain_point TEXT NOT NULL,
  vibe TEXT NOT NULL,
  
  -- Features and pricing
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  price_min INTEGER,
  price_max INTEGER,
  
  -- Media and metadata
  image_url TEXT,
  is_saved BOOLEAN DEFAULT false,
  is_ai_generated BOOLEAN DEFAULT false,
  
  -- Remix lineage (for future remix feature)
  parent_id BIGINT REFERENCES sparks(id) ON DELETE SET NULL,
  remix_notes TEXT,
  remix_depth INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_sparks_user_id ON sparks(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_sparks_created_at ON sparks(created_at DESC);

-- Note: Row Level Security is handled at the application level with Clerk
-- Since we're using Clerk for auth, RLS policies would need to be set up
-- with service role key or disabled. For now, we'll rely on application-level
-- authorization in the API routes.

-- If you want to enable RLS later, you can create a function to validate Clerk user IDs
-- For now, RLS is disabled - authorization happens in API routes

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at
CREATE TRIGGER update_sparks_updated_at
  BEFORE UPDATE ON sparks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

