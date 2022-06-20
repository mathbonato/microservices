#!/usr/bin/env python
import pika
import json


connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='yourbank')

data = { "customerId": 1, "amount": 10 }
message = json.dumps(data)  

channel.basic_publish(exchange='',
                      routing_key='yourbank',
                      body=message)
print(" [x] Sent Message  %r" % message)
connection.close()