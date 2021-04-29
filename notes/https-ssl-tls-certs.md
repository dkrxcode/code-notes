source: https://www.namecheap.com/support/knowledgebase/article.aspx/794/67/how-do-i-activate-an-ssl-certificate/

buy a domain and TLS 
- TLS is better than SSl

* Generate a cert from a Certified Authority CA

Use the cert to confirm you own the domain via Domain Control Validation (DCV) 
* Can use CName, email, or file. This example uses CName
* Upload cert to Domain Registrar
* Get CName Record info: Host and authority Value
  _xyz980.example.com.
  abc123.efg456.hij789.comodoca.com.

export private key from keychain
Convert your private key .p12 -> .pem

$ openssl pkcs12 -in key.p12 -out key.pem -nodes

https://www.namecheap.com/cart/checkout/orderconfirmation/?id=73147409

