# gamehunter
TBD

# Configuration Notes
## Windows
### gcloud CLI Configuration Tool
The gcloud tool is used to configure, access, and verify the various Google Cloud Platform services. This along with the Google Credentials listed below, allows the developer to run and debug code locally. Follow these steps to install the gcloud tool:

- if needed, install git with bash terminal  
- if needed, install python  
	- do the custom install  
	- install for all users  
	- verify that it is accessible from the bash terminal window  
- install gcloud without accompanying python  
	-  once installed, test using the "gcloud init" command  
		- choose the account  
		- choose the "gamehunter-417801" project  
		- configure the default region and zone  
		- choose "us-central1-a" zone  
		- enter "gcloud config list" to verify settings  

### Google Credentials
These credentials are used by the Google code library. When running locally, the appropriate environment variable must be configured for the code library to run properly. When deployed to GCP, the variable is set during deployment automatically. 

- TBD 

# Development Notes

TBD
