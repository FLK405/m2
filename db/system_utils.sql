-- PostgreSQL DDL for System Utilities tables

-- System Help Documents Table
DROP TABLE IF EXISTS system_help_docs CASCADE;
CREATE TABLE system_help_docs (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(200) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100)
);

COMMENT ON TABLE system_help_docs IS 'Stores system usage instructions and help documents.';
COMMENT ON COLUMN system_help_docs.id IS 'Unique identifier for the help document.';
COMMENT ON COLUMN system_help_docs.topic IS 'Topic of the help document, must be unique.';
COMMENT ON COLUMN system_help_docs.content IS 'Full content of the help document.';
COMMENT ON COLUMN system_help_docs.last_updated IS 'Timestamp when the document was last updated. Defaults to current timestamp.';
COMMENT ON COLUMN system_help_docs.updated_by IS 'User or process that last updated the document.';
