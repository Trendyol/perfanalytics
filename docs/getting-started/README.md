# Getting Started

## Installation
We need to do some steps in order to installation for the Perfanalytics.
1. Open Terminal and clone project
```
git clone https://github.com/Trendyol/perfanalytics.git
```

2. Once the project is cloned, `cd` into its folder:
```
cd perfanalytics
```

3. Run `npm install` to download all of the project's dependencies:
```
npm install
```

4. When the project dependencies are installed, open your ide with project and fill the environment values that you need as shown in the `.example.env` file. 

5. After you make sure environment values are filled correctly, run the commands below in seperate terminals:
```
npm run server:start
npm run client:start
```

## Quick Start
  TODO:

## Environment Values

  #### DB AND STORAGE
  Perfanalytics can work with various databases and storages. <br>
  `DB_CONFIG: mongodb | couchbase`  <br>
  `UPLOAD_CONFIG: ipfs | aws | firebase | azure` <br>
  fill **only** the desired config's related connection values  <br>
  [mongodb](https://www.mongodb.com/docs/manual/introduction) [ipfs](https://docs.pinata.cloud) 

  #### SLACK (optional)
  Perfanalytics can send reports and alerts to desired slack channel <br>
  `SLACK_TOKEN: <SLACK_TOKEN>` <br>
  `DOMAIN: <APP DOMAIN ADDRESS>` <br>

  #### CHROME UX REPORT (optional)
  Perfanalytics can store and visualize monthly chrome user experience report <br>
  `UX_API_KEY: <UX_API_KEY>` <br>


  


