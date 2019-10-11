<#
.SYNOPSIS
  This script sets the Bing Maps Api Key into the storage entity at a tenant level.
.DESCRIPTION
  This script sets the Bing Maps Api Key into the storage entity at a tenant level.
  The API key is later used by SharePoint Framework extensions and web parts that require the Bing Maps functionality.
  If the key is already presented, the script overrides the existing value.

  The script requires a tenant administator account to run.
.EXAMPLE
  -Tenant YOUR_TENANT_NAME -BingMapsApiKey YOUR_BING_MAPS_API_KEY
#>

param([string]$TenantName, [string]$BingMapsApiKey)

# verify the PnP cmdlets we need are installed
if (Get-Command Get-PnPStoredCredentiaal -ErrorAction SilentlyContinue  ) {
  Write-Host "Could not find PnP PowerShell cmdlets"
  Write-Host "Please install them and run this script again"
  Write-Host "You can install them with the following line:"
  Write-Host "`nInstall-Module SharePointPnPPowerShellOnline`n"
  break
}

$Credentials = Get-Credential

# Check if tenant name was passed in
if ([string]::IsNullOrWhitespace($TenantName)) {
  # No TenantName was passed, prompt the user
  $TenantName = Read-Host "Please enter your tenant name"
}

# Check if api key was passed in
if ([string]::IsNullOrWhitespace($BingMapsApiKey)) {
  # No Api key was passed, prompt the user
  $BingMapsApiKey = Read-Host "Please enter your Bing Maps Api Key"
}

$AdminURL = "https://$TenantName-admin.sharepoint.com"

# Connect to Admin site.
try {
  Connect-PnPOnline -Url $AdminURL -Credentials $Credentials
}
catch {
  Write-Host "Failed to authenticate to $AdminURL"
  Write-Host $_
  break
}

Set-PnPStorageEntity -Key DroBingMapsApiKey -Value $BingMapsApiKey -Description "Bing Maps API Key"
Get-PnPStorageEntity -Key DroBingMapsApiKey
