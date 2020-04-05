'''
* Fix ability to set timeout for urllib3 (#6286)
@@ -137,7 +137,7 @@ def __init__(self, remote_server_addr, keep_alive=False, resolve_ip=True):

        self._url = remote_server_addr
        if keep_alive:
            self._conn = urllib3.PoolManager()
            self._conn = urllib3.PoolManager(timeout=self._timeout)

        self._commands = {
            Command.STATUS: ('GET', '/status'),
@@ -398,7 +398,7 @@ def _request(self, method, url, body=None):

            statuscode = resp.status
        else:
            http = urllib3.PoolManager()
            http = urllib3.PoolManager(timeout=self._timeout)
            resp = http.request(method, url, body=body, headers=headers)

            statuscode = resp.status
'''


from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import sqlite3
import time
import re




def crawler( date_var = "2020-03-19",start_table=0, dog_name_counter=0 ):

    # set headless browser
    #u can use PhantomJS if u do not like Chrome GUI, i recomend Chrome.
    driver = webdriver.Chrome()

    # set variables
    url = str("https://greyhoundbet.racingpost.com//#results-list/r_date=" + date_var)
    wait = WebDriverWait(driver, 30)
    css_selctor=" div.results-race-list-row [href]"
    global count
    count = start_table -1
    iD = start_table
    #fix statement
    if start_table < 0: start_table == 0

    #get url of specified date
    driver.get(url)
    time.sleep(3)

    # loop over the main links
    row_links = driver.find_elements_by_css_selector(css_selctor)
    links = [elem.get_attribute('href') for elem in row_links]
    for link in links[start_table:len(links)]:

        #gurdian statement
        if type(link) is not str: continue

        #collection variables 
        dogs_href = []
        dogs_names = []
        
        dog_name_counter = -1
        count += 1

        #entr the result meeting page
        driver.get(link)
        wait.until(EC.url_to_be(link))

        #enter the table of dogs
        time.sleep(5)
        get_dogs_href = driver.find_elements_by_css_selector("div.container [href]")
        get_dogs_names = driver.find_elements_by_css_selector("div.name")

        #collect dogs href
        for href in get_dogs_href:
            href = href.get_attribute('href')
            dogs_href.append(href)
            continue

        #collect dogs name
        for name in get_dogs_names:
            name = name.get_attribute('innerHTML')
            name = name.strip()
            dogs_names.append(name)
            continue
        #check whether collected desired data
        try:
            type(dogs_href) == list
            type(dogs_href) == list
        except:
            print("your internet might be interrupted do not worry run the function again and set: start_table to", count)

        #enter to each dog table
        for dog in dogs_href:
            #variable for dogs names
            dog_name_counter += 1
            td = []
            driver.get(dog)
            wait.until(EC.url_to_be(dog))
            time.sleep(6)
            
            # get table headers
            get_headr = driver.find_element_by_class_name('columnHeaders')
            get_headr = get_headr.get_attribute('innerHTML')
            get_headr = BeautifulSoup(get_headr, 'html.parser')
            get_headr = get_headr.get_text().strip().split()

            #get dog id
            dog_id = re.findall(r"dog_id=([0-9]+)",dog)
            dog_id = dog_id[0]
            
            # get the main table
            table = driver.find_elements_by_css_selector(
                'table#sortableTable tbody td')

            # convert to redable data
            for table_data in table:
                table_data = table_data.get_attribute('innerHTML')
                table_data = BeautifulSoup(table_data, 'html.parser')
                table_data = table_data.get_text().strip()

                # replace empty cells with NA
                if table_data == '':
                    table_data = 'NA'
                td.append(table_data)
                continue
            
            #set connections
            con = sqlite3.connect("crawler_db.db")
            con.text_factory = str
            cur = con.cursor()

            #create table
            cur.execute("""
            CREATE TABLE IF NOT EXISTS t (
                'Date' BLOB ,
                'Track' BLOB,
                'Dis'  BLOB,
                'Trp' BLOB,
                'Split' BLOB,
                'Bends' BLOB,
                'Fin' BLOB,
                'By' BLOB,
                'Win/Sec' BLOB,
                'Remarks' BLOB,
                'WnTm' BLOB,
                'Gng' BLOB,
                'Wght' BLOB,
                'SP' BLOB,
                'Grade' BLOB,
                'CalTm' BLOB,
                'DogName' TEXT,
                'iD' INTEGER,
                'DogId' BLOB,
                PRIMARY KEY(DogName, Date,iD)
                
                )
            """)

            #split td into 16 row
            pieces = [td[x:x+16] for x in range(0, len(td), 16)]
            
            #extract data from pieces then store it
            for i in pieces:
                iD += 1
                cur.execute('INSERT OR IGNORE INTO t  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                     (i[0],i[1],i[2],i[3],i[4],i[5],i[6],i[7],i[8],i[9],i[10],i[11],i[12],i[13],i[14],i[15],dogs_names[dog_name_counter],iD,dog_id))

                con.commit()

            print(dogs_names[dog_name_counter],'has been sent to base...','dogs left:', len(dogs_names) - dog_name_counter - 1)

            #repeat until dogs are finished
            if dog != dogs_href[len(dogs_href) - 1]: continue
            
        print('Completed tables:', count, 'out of', len(links) - 1)
            

crawler()

'''
    this program crawl all tables for all the dogs, of specified date. 


    crawler variables are:

    start_table = integer   u can set from where to start if your internet inturrepted while scraping, console will show how many tables are finished, it is 0 by default.

    dog_name_counter = integer ... u can set from which dog to start but please be carefull when you use it u must
    also  set start_table.. 
    example: if u want to start from table one dog two... crawler(start_table = 1, dog_name_counter = 2)
    it's 0 by default

    date_var = "yyyy-mm-dd" ..  it's "2020-03-19" by default

    hope you like it, enjoy :D .

'''