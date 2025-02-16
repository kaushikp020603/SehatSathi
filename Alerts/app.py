from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import urllib.parse

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/api/latest-health/alerts')
def latest_health_alerts():
    url = "https://mohfw.gov.in/?q=media/disease-alerts"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    view_content_div = soup.find('div', class_='view-content')

    alerts = []

    if view_content_div:
        table = view_content_div.find('table')
        if table:
            rows = table.find('tbody').find_all('tr')
            for row in rows:
                cells = row.find_all('td')
                
                if len(cells) >= 4:
                    title = cells[1].text.strip()
                    
                    document_cell = cells[3]
                    document_links = document_cell.find_all('a')
                    
                    document_links_info = []
                    for link in document_links:
                        doc_url = link.get('href')
                        doc_text = link.text.strip().split(' (')[0]  # Remove the file size
                        document_links_info.append({
                            'text': doc_text,
                            'url': doc_url
                        })
                    
                    # Create Google search URL for the title
                    search_query = urllib.parse.quote(title)
                    google_search_url = f"https://www.google.com/search?q={search_query}"
                    
                    # Prepare data for API response
                    alert = {
                        'title': title,
                        'documents': document_links_info + [{
                            'text': 'Know more',
                            'url': google_search_url
                        }]
                    }
                    alerts.append(alert)

    # Debug print to check what is being returned
    print("Alerts:", alerts)

    return jsonify(alerts)

if __name__ == "__main__":
    app.run(debug=True, port=8200)
