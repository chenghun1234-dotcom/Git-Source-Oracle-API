CREATE TABLE IF NOT EXISTS error_patterns (
    id TEXT PRIMARY KEY,
    error_message TEXT NOT NULL,
    framework TEXT,
    solution_diff TEXT,
    source_url TEXT,
    confidence REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS modernization_patterns (
    id TEXT PRIMARY KEY,
    legacy_code TEXT,
    modern_code TEXT,
    target_library TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_logs (
    id TEXT PRIMARY KEY,
    query_type TEXT,
    query_payload TEXT,
    response_payload TEXT,
    user_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
