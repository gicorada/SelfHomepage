# SelfHomepage

Selfhostable homepage for your selfhosted services.

SelfHomepage aims to support many selfhosted services, and provide a simple way to access them.

## Installation

Host the files in a webserver, and edit the `config.json` file to add your services.

The `services.json` file should look like this:

```json
{
  "services": [
    {
      "title": "Jellyfin",
      "port": 8096,
      "image": "images/services/jellyfin.png"
    }
  ]
}
```
Available settings:  
` title ` (required): Title of the service.  
` port ` (required): Port where the service is hosted.  
` image `: Path to the image of the service.


You will have to add the images in the `images/services` folder, as they might be copyrighted and I don't want to host them in my github repository.


Available settings (in `settings.json`):  
` title `: Title of the page. Default: `SelfHomepage`  
` host `: Hostname of the server where the services are hosted. Defaults to ` localhost `, but change with your server local address if you want to access the page from another device.  
` background_img_path `: Path to the background image. Please use an absolute path, as the pages can be in different directories  
` background_color `: Solid color for the background (if an image is not set). If an image is set, this will be ignored. If neither this nor image path is provided, this defaults to  "#000000"  
