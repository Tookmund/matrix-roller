#!/bin/sh

curl -XPOST -d '{"type":"m.login.password", "user":"'"$1"'", "password":"'"$2"'"}' "https://matrix.org/_matrix/client/r0/login" | grep access_token
