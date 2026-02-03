<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=matchpoint_db', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SHOW TABLES LIKE 'users'");
    $tableExists = $stmt->rowCount() > 0;

    echo json_encode([
        'status' => 'ok',
        'message' => 'Backend is running and Database is connected',
        'table_users' => $tableExists ? 'Exists' : 'Missing',
        'php_version' => phpversion()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
}
