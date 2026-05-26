Write-Host 'Waiting for localhost:3000...'
while (-not (Test-NetConnection -ComputerName '127.0.0.1' -Port 3000).TcpTestSucceeded) { Start-Sleep -Seconds 1 }
Write-Host 'Server up, sending test POST...'
$captcha='ABCDE'
$hash=[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($captcha + 'mango-cargo-salt'))
$body = @{
  name='Test'
  email='test@example.com'
  subject='Test'
  message='Hello'
  captchaInput=$captcha
  captchaHash=$hash
}
$bodyJson = $body | ConvertTo-Json -Depth 5
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:3000/api/contact' -Method Post -Body $bodyJson -ContentType 'application/json' -ErrorAction Stop
  Write-Host 'Response:'
  $res | ConvertTo-Json -Depth 5 | Write-Host
} catch {
  Write-Host 'Request failed'
  $resp = $_.Exception.Response
  if ($resp) {
    $sr = New-Object System.IO.StreamReader($resp.GetResponseStream())
    $text = $sr.ReadToEnd()
    Write-Host 'Response body:'
    Write-Host $text
  } else {
    Write-Host $_
  }
}
