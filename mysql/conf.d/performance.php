[mysqld]
# Skip reverse DNS lookup
skip-name-resolve

# Performance tuning (MySQL 8.0 compatible)
innodb_buffer_pool_size = 256M
innodb_redo_log_capacity = 128M
innodb_flush_log_at_trx_commit = 2

# Connection tuning
max_connections = 200
wait_timeout = 300
interactive_timeout = 300