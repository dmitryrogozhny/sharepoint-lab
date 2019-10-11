<#
.SYNOPSIS
  Saves the existing list from the specified site into the provisioning template.
.DESCRIPTION
  Saves the existing list from the specified site into the provisioning template.

  The template file can later be used to provision lists with the same configuration on other sites.
.EXAMPLE
  -SiteUrl SITE_URL -ListTitle LIST_TITLE -FilePath FILE_PATH
#>

param(
  [string]$SiteUrl,
  [string]$ListTitle,
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

# Check if the list title was passed in
if ([string]::IsNullOrWhitespace($ListTitle)) {
  $SiteUrl = Read-Host "Please enter the list title"
}

# Check if the file path was passed in
if ([string]::IsNullOrWhitespace($FilePath)) {
  $FilePath = Read-Host "Please enter the file path, where to save the template"
}

try {
  Connect-PnPOnline -Url $SiteUrl -Credentials $Credentials
}
catch {
  Write-Host "Failed to authenticate to $SiteUrl"
  Write-Host $_
  break
}

# get all lists, but keep only the target one
$template = Get-PnPProvisioningTemplate -OutputInstance -Handlers Lists
$listTemplate = $template.Lists | Where-Object { $_.Title -eq $ListTitle }
$template.Lists.Clear()
$template.Lists.Add($listTemplate)

Save-PnPProvisioningTemplate -InputInstance $template -Out $FilePath
