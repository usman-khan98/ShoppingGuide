import json
import sys
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# products = {"Names": [], "Prices": [], "URLs": [], "Images": []}

products = {"ProductNames": [], "ProductPrices": [],
            "ProductUrl": [], "ProductImages": []}

query = str(sys.argv[1])

driver = webdriver.Chrome("chromedriver.exe")

# driver.set_window_position(-10000, 0)

driver.get("https://www.mega.pk/")

search_bar = driver.find_element(By.ID, "searchq")

search_bar.send_keys(query, Keys.ENTER)
time.sleep(3)


# lazy loading images
# last_height = 500
# while True:
#     driver.execute_script(
#         "window.scrollTo(0, "+str(last_height)+");")
#     time.sleep(2)
#     if last_height == 3500:
#         break
#     last_height = last_height + 500

scroll_pause_time = 1.5
screen_height = driver.execute_script(
    "return window.screen.height;")
i = 1

while True:
    driver.execute_script(
        "window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))
    i += 1
    time.sleep(scroll_pause_time)
    scroll_height = driver.execute_script("return document.body.scrollHeight;")
    if (screen_height) * i > scroll_height:
        break


# names
names = driver.find_elements(By.CSS_SELECTOR, "#lap_name_div > h3 > a")
index = 1
for index in names:
    products["ProductNames"].append(index.text)


# prices
prices = driver.find_elements(By.CLASS_NAME, "cat_price")
index = 1
for index in prices:
    products["ProductPrices"].append(index.text)


# url
urls = driver.find_elements(By.CSS_SELECTOR, "#lap_name_div > h3 > a")
index = 1
for index in urls:
    products["ProductUrl"].append(index.get_attribute("href"))


# img
img = driver.find_elements(
    By.CSS_SELECTOR, "div.wrapper1 > a > img:first-child")
index = 1
for index in img:
    products["ProductImages"].append(index.get_attribute("src"))

print(json.dumps(products))

# with open('mega.json', 'w') as fp:
#     json.dump(products, fp, indent=4)

driver.quit()
