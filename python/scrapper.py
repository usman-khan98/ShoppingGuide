from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time
# from selenium.webdriver.chrome.options import Options
# chrome_opt = Options()
# chrome_opt.add_argument("--headless")
Path = "D:\Softwares\chromedriver_win32\chromedriver.exe"
url = "https://www.daraz.pk/#"
driver = webdriver.Chrome(Path)
driver.set_window_position(-10000, 0)
driver.get(url)
searchBox = driver.find_element(By.ID, "q")
product = 'mobiles'
searchBox.send_keys(product)
searchButton = driver.find_element(
    By.XPATH, "/html/body/div[1]/div/div/div[1]/div/div/div[2]/div/div[2]/form/div/div[2]/button")
searchButton.click()
time.sleep(10)
helloClass = driver.find_elements(By.CLASS_NAME, "image--WOyuZ")
index = 1
for index in helloClass:
    # if(index%2 == 0):
    #     continue
    print(" No: "+str(index.get_attribute("src")))
# link = driver.find_elements(By.CLASS_NAME, "title--wFj93")
# for index in range(160):
#     # if(index%2 == 0):
#     #     continue
#     print(str(index)+" No: "+link[index].text)
searchButton = driver.find_element(
    By.XPATH, "/html/body/div[3]/div/div[2]/div/div/div[1]/div[3]/div/ul/li[9]/a")
searchButton.click()
time.sleep(10)
helloClass = driver.find_elements(By.CLASS_NAME, "image--WOyuZ")
print('next page')
index = 1
for index in helloClass:
    # if(index%2 == 0):
    #     continue
    print(" No: "+str(index.get_attribute("src")))

driver.quit()
