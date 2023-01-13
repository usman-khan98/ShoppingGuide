import sys
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import json

newDetails = {
    "image": [],
    "review": [],
    "price": []
}


url = str(sys.argv[1])


driver = webdriver.Chrome("chromedriver.exe")
# driver.maximize_window()
driver.set_window_position(-10000, 0)
driver.get(url)

scroll_pause_time = 1.5
screen_height = driver.execute_script(
    "return window.screen.height;")
i = 0.5

while True:
    driver.execute_script(
        "window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))
    i += 1
    time.sleep(scroll_pause_time)
    scroll_height = driver.execute_script("return document.body.scrollHeight;")
    if (screen_height) * i > scroll_height:
        break


# next review section
# input = driver.find_element(
#     By.CSS_SELECTOR, "body > div > div.container.min-w1170 > div > div.col-md-9.col-xs-12 > div > div > ul > li:nth-child(2) > a")


# ActionChains(driver).move_to_element(input)

price = driver.find_element(
    By.CSS_SELECTOR, "#module_product_price_1 > div > div > span"
)

newDetails["price"].append(price.text)


# scrap reviews
reviews = driver.find_elements(
    By.CSS_SELECTOR, "div.item-content > div.content:first-child")
index = 1
for index in reviews:
    newDetails["review"].append(index.text)


# scrap hq image
image = driver.find_element(
    By.CSS_SELECTOR, "#module_item_gallery_1 > div > div.gallery-preview-panel > div > img.pdp-mod-common-image.gallery-preview-panel__image")


newDetails["image"].append(image.get_attribute("src"))

print(json.dumps(newDetails))

driver.quit()
