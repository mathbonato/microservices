#!/usr/bin/env python
import json
import pika
credentials = pika.PlainCredentials('username', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters
(host='localhost', port=5672, credentials=credentials))
channel = connection.channel()

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    data = json.loads(body)
    fees = data['amount'] * 0.01
    result = { "customerId": data['customerId'], "fees": fees }
    message = json.dumps(result)   
    channel.basic_publish(exchange='',
                      routing_key='calculatedFees',
                      body=message)
    print("RESPONSE %r" % message)

channel.basic_consume('yourbank', 
                      callback,
                      auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()