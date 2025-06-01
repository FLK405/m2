# pgAdmin Connection Guide - Final Solution

## Issue Resolution
The password authentication failure was caused by PostgreSQL storing the password in SCRAM-SHA-256 format while pgAdmin expected MD5 format for authentication.

## Solution Applied
1. **Changed PostgreSQL authentication method** in `/etc/postgresql/14/main/pg_hba.conf` to use `md5`
2. **Reset password with MD5 encryption** using `SET password_encryption = 'md5'`
3. **Verified password hash format** changed from SCRAM-SHA-256 to MD5

## pgAdmin Connection Settings

### Connection Tab
- **Host name/address**: `127.0.0.1` (or `localhost`)
- **Port**: `5432`
- **Maintenance database**: `material` (or `postgres`)
- **Username**: `material`
- **Password**: `test123`

### SSL Tab
- **SSL mode**: `Disable`

### Advanced Tab
- Leave all settings as default

## Verification Steps

### 1. Command Line Test (Successful)
```bash
PGPASSWORD=test123 psql -h 127.0.0.1 -U material -d material -c "SELECT current_user;"
```
Result: Shows `material` user connected successfully

### 2. Password Hash Verification
```bash
sudo -u postgres psql -c "SELECT usename, passwd FROM pg_shadow WHERE usename = 'material';"
```
Result: Shows MD5 hash format: `md5dc58e5dc437ee7f5ca3d7da679c84e29`

### 3. Web Application Test (Working)
The web application continues to work normally and can insert/retrieve data.

## What Changed
- **Before**: Password stored as SCRAM-SHA-256, causing pgAdmin authentication failure
- **After**: Password stored as MD5, compatible with pgAdmin authentication

## Next Steps
1. **Try connecting to pgAdmin** with the settings above
2. **If connection is successful**, you should see:
   - The `material` database in the database list
   - The `spinning_process` table with all data (including web application entries)
   - Full synchronization between web application and pgAdmin

## Troubleshooting
If you still encounter issues:
1. Restart pgAdmin completely
2. Clear any saved connection credentials in pgAdmin
3. Double-check the password is exactly `test123`
4. Ensure you're using `127.0.0.1` not `localhost` if there are DNS issues
