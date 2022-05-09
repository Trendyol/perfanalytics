# Perfanalytics

Performance tracking and monitoring tool, based on [Lighthouse](https://web.dev/measure).

![Perfanalytics](https://github.com/Trendyol/perfanalytics/blob/main/perfanalytics.gif)

## Introduction

:rocket: **Perfanalytics** was created to measure and monitor web applications' performance in one place. Also **Perfanalytics** can be used to report unexpected performance incidents.

## Getting Started

Install and start using **Perfanalytics** project instantly:

#### ⏳ Installation

```bash
git clone https://github.com/Trendyol/perfanalytics.git
```

Once the project is cloned, `cd` into its folder and run `npm install` to download all of the project's dependencies:

```bash
cd perfanalytics && npm install
```

When the project dependencies are installed, fill the environment values that you need as shown in the `.example.env` file. <br />
After you make sure environment values are filled correctly, run the commands below in seperate terminals:

```bash
npm run server:start
npm run client:start
```

Enjoy 🎉

## Features

- Register urls by devices ( Mobile / Desktop )
- Categorize urls by tags
- Show eight key performance metrics with tables and charts
- Show average statistics and changes over time by url
- Run lighthouse for a single url or all the registered urls
- Show detailed lighthouse output
- Add slack configuration with channel name
  - set performance thresholds and get alert messages
  - get daily/weekly/monthly performance reports

## License

[Apache License 2.0](https://github.com/Trendyol/perfanalytics/blob/main/LICENSE).
