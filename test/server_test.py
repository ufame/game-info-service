import requests
import threading
import logging

logging.basicConfig(level=logging.INFO, filename='test.txt', filemode='w', format='%(asctime)s - %(levelname)s - %(message)s')

def make_requests():
    url = 'http://127.0.0.1:3000/api/game-info/info?type=cs16&host=93.191.11.213&port=27055'
    num_requests = 100

    for _ in range(num_requests):
        response = requests.get(url)
        logging.info('Response Body: %s', response.text)

num_threads = 10
threads = []

for _ in range(num_threads):
    thread = threading.Thread(target=make_requests)
    thread.start()
    threads.append(thread)

for thread in threads:
    thread.join()