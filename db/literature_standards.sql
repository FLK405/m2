-- PostgreSQL DDL for Literature and Standards table

DROP TABLE IF EXISTS literature_standards CASCADE;
CREATE TABLE literature_standards (
    id BIGSERIAL PRIMARY KEY,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('文献', '标准', '测试方法', '行业规范')),
    title_standard_no VARCHAR(500) NOT NULL,
    authors_issuing_body VARCHAR(500),
    publication_year_date VARCHAR(50),
    journal_publisher_source VARCHAR(200),
    keywords TEXT,
    abstract_scope_description TEXT,
    file_path_url VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT
);

COMMENT ON TABLE literature_standards IS 'Stores information about literature, standards, test methods, and industry specifications.';
COMMENT ON COLUMN literature_standards.id IS 'Unique identifier for the document record.';
COMMENT ON COLUMN literature_standards.document_type IS 'Type of the document (e.g., 文献, 标准, 测试方法, 行业规范).';
COMMENT ON COLUMN literature_standards.title_standard_no IS 'Title of the literature or Standard number.';
COMMENT ON COLUMN literature_standards.authors_issuing_body IS 'Authors of the literature or issuing body of the standard.';
COMMENT ON COLUMN literature_standards.publication_year_date IS 'Year or specific date of publication/issue.';
COMMENT ON COLUMN literature_standards.journal_publisher_source IS 'Journal, publisher, or source of the document.';
COMMENT ON COLUMN literature_standards.keywords IS 'Keywords associated with the document.';
COMMENT ON COLUMN literature_standards.abstract_scope_description IS 'Abstract of the literature or scope/description of the standard.';
COMMENT ON COLUMN literature_standards.file_path_url IS 'Filesystem path or URL to the document.';
COMMENT ON COLUMN literature_standards.entry_date IS 'Timestamp when the record was added. Defaults to current timestamp.';
COMMENT ON COLUMN literature_standards.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN literature_standards.remarks IS 'Additional notes or comments.';
