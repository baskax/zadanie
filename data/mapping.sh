#!/bin/bash

curl -XPUT 'localhost:9200/catalog?pretty' -H 'Content-Type: application/json' -d @mapping.json
