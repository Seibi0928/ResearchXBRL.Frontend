<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">EDINETのXBRL情報で勘定項目を分析するためのツール(仮)</h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

EDINETのXBRL情報で勘定項目を分析するためのツール
フロントエンドプロジェクト

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With
* [Docker](https://www.docker.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [node.js](https://nodejs.org/)
* [webpack.js](https://webpack.js.org/)
* [React.js](https://reactjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

簡単に環境構築するために以下3つの導入をお願いします。
* Docker
  * [導入手順](https://docs.docker.com/get-started/)
* [VSCode](https://code.visualstudio.com/)
* [RemoteContainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)(VSCode拡張)

### Installation

1. リポジトリのクローン
   ```sh
   https://github.com/Seibi0928/ResearchXBRL.Frontend.git
   ```
1. コンテナ環境構築(Devcontainerを使う場合)
  a. VSCodeを開く
  ```sh
  code ./ResearchXBRL.Frontend
  ```
  b. F1を押下しコマンドパレットを開く
  c. Reopen in Containerと入力し選択

1. Devcontainerを使わない場合
   ```sh
   cd ResearchXBRL.Frontend
   docker-compose -f ./devcontainer/docker-compose.yml
   ```

#### EDINETのデータインポート方法

- 付属のインポート用バッチを利用します
- 任意で実行時引数を指定してください
  * --from
    * 取得する書類の提出日下限を指定します
    * 指定しない場合は24時間前の日時が指定されます
    * 5年以上前の日時を指定した場合エラーになります EDINETは直近5年のデータしか返さないため

  * --to
    * 取得する書類の提出日上限を指定します
    * 指定しない場合は現時刻が指定されます
    * 5年以上前の日時を指定した場合エラーになります EDINETは直近5年のデータしか返さないため

  * --maxParallelism
    * インポート処理の並列数を指定します
    * 指定しない場合は1が指定されます

- 例
```sh
docker exec aquire_financial_reports_batch /bin/bash -c "dotnet /app/AquireFinancialReports.dll --from 2021-01-01 --to 2021-12-01 --maxParallelism 2"
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

企業名と会計項目名を選択すると時系列グラフが表示される

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

歓迎

1. プロジェクトをフォーク
2. featureブランチ作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチをプッシュ (`git push origin feature/AmazingFeature`)
5. プルリク

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
ryo13579978@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/Seibi0928/ResearchXBRL.Frontend/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/Seibi0928/ResearchXBRL.Frontend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png