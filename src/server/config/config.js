import "dotenv/config"
const pwd = process.env.pwd

const fireBase = {
    "type": "service_account",
    "project_id": "coderhouseproyect",
    "private_key_id": "0aa443b506a00a8d52ecadb04942c318dca1f168",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDnqnIazxm3XL7A\noaRfY6aWvRARHGzGMwygZRQDOeLcaVq6MejHGRqoC3Mtz9XIKE3CNJf7n5yZSTLs\nXgTog6t/W6GcXPGQEvJEjYRFq/JIHtJKhdXO7yP4v2ZBdt7tdK2vqTUZKYxa1+i7\nuxKfYywy0j2lYdyIK7KzWqOq3QcfcNG7AuvxQjn+4DiZU8ZUqOjScKmpI9tUOMRx\nQdslLaLXnbKJP9orpDqvGbv/LNbW/6OlKU93WqUH+UpDOfeaTpNLnV3o77fbSIOw\nxZZF5USSpCy1P/buIDq41ZNbIAmPbLxqkrak9JAij2nLS58HNN/YoWId+xrOE3Uo\nwADU/tZjAgMBAAECggEAARIxqtwQQ1/DZgKZTvOX/pRrMZkPC6+KvGcbO5SV7uzx\nxXCboegEzogXBTwzwdQl3+L8XOZ1A+RpvtwEa8rIDTOwQJfRahgcVKLO3L+ZxCmY\nUU3jGizS3sCLyXuyNijW8Lv4ieA+TOE4qz2HLYN43ddI/62/JkYFcnzVyuFwuf16\nSdv0jocer6Dse3meAO5twJA6La2MRrZGD1JXIWCnINmVY4b6WVlrsAw2hLWVaeYa\n9US0BMsINwbjrxjzEA8HZau0Gb0ApV4Ln/MGh5p+XBJPlGtI7+TaW/8W3Td1LX/I\n3yZL5PDVJtMGQzpjNy3IPCSGMwt1mtH6tcAB9XRYAQKBgQD9ACrb97s7ROjCfHHx\nAhmDdINqwys0tMccmsxE+0QHOWZ5pDCFrVWlzV9G5QQzLssJW5X/9K/2WLEy8aCM\nmlzBCCcAac0GUnc30jaMEcIYez2d+C3I70yLfPpQvdd446mWbBjrgtynNqc99tox\npvpsLTQDpFU4xYEHJgo3/htaYwKBgQDqaYdyawPbdCvAIC136/a9Pdam5jPU3zDK\n0eWTBcQBbJxoHVt5ZE9lLCmA/wlGT+YmOPbDr2cVtfPYzvOvbbPCdupOwqOi2+CC\nypO0VsIKqdgRFDVdKGdTRMVpOHhj7bHv+hv5ZsJ/mc3oBpY6NEvYRj6chBMrTVvo\nv1ugvUlUAQKBgFDtE8iGpmIf+Z/0NHIV7NlKlJq60QAr7yCsNzi9cpYo+ylfppGr\nzyCY36gKq1w/1HwqyoEz4HEZD50vAt7WpWKtW+Ra81TZXf8CA6asK3yvNxdngiWq\nvb5EfMEE6H5nvCA8dYAnvLLT3Y0Jf+Ov+JxPnTqo/wWIz2vc9BnS8ybnAoGBAIsS\npPtrJlSy7aoE7TTy1+aao5lNhn7LFAWg1hWOHCXELF9Q245/xuL9eno/1V7T1HXk\n4fJjREOLOertjYINEdNT/dtQewkKbn7qdQtPVbxB3CD13lswt2ydpomwqSyQPztj\nJemn38kYlSMNlV9e24iq1EbDzSOpt9e0gEYzRygBAoGBAIT7enGf5uchhf0E7CB9\n+H8kHy+JPqt2Vj1VYx+s0YGFmvHT5CbMwQ4E1DibwMUWoz3MeAVwJBuAXpAZiuWW\n5E5kh8sQEiARtQV2zoTmJyV0OlY8V5Tsjzb2xZ85TBMi2XdhnmIN5LmZHVlcWi+3\nBTPtFOuPG0NJLWNIWi5e3OwX\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-34sb8@coderhouseproyect.iam.gserviceaccount.com",
    "client_id": "112888565919169001127",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-34sb8%40coderhouseproyect.iam.gserviceaccount.com"
  }
  
const mongoURL  =`mongodb+srv://admin:${pwd}@cluster0.ii4wa.mongodb.net/ecommerce`
export default { mongoURL, fireBase }