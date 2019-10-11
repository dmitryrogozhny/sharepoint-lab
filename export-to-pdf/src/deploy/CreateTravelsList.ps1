<#
.SYNOPSIS
  This script provisions the Travels List in the specified site using the provided PnP template.
.DESCRIPTION
  This script provisions the Travels List in the specified site using the provided PnP template.

  The Travels list contains a set of fileds used in examples. Additionally, the template contains sample list items.
.EXAMPLE
  -SiteUrl SITE_URL -FilePath FILE_PATH
#>

param(
  [string]$SiteUrl,
  [string]$FilePath
)

# verify the PnP cmdlets we need are installed
if (Get-Command Get-PnPStoredCredentiaal -ErrorAction SilentlyContinue  ) {
  Write-Host "Could not find PnP PowerShell cmdlets"
  Write-Host "Please install them and run this script again"
  Write-Host "You can install them with the following line:"
  Write-Host "`nInstall-Module SharePointPnPPowerShellOnline`n"
  break
}

$Credentials = Get-Credential

# Check if the site Url was passed in
if ([string]::IsNullOrWhitespace($SiteUrl)) {
  $SiteUrl = Read-Host "Please enter your site Url"
}

# Check if the file path was passed in
if ([string]::IsNullOrWhitespace($FilePath)) {
  $FilePath = Read-Host "Please enter the file path for the template"
}

try {
  Connect-PnPOnline -Url $SiteUrl -Credentials $Credentials
}
catch {
  Write-Host "Failed to authenticate to $SiteUrl"
  Write-Host $_
  break
}

Apply-PnPProvisioningTemplate -Path $FilePath
