#!/bin/bash
set -e
rm -f /api-app/tmp/pids/server.pid
exec "$@"
