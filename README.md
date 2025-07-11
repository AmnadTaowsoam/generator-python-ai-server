# generator-python-ai-server

Yeoman generator for scaffolding a Python AI server microservice.

## Prerequisites

* [Node.js](https://nodejs.org/) v14 or later
* [Yeoman](https://yeoman.io/) (`npm install -g yo`)
* Python 3.8 or later
* pip

## Installation

Clone the repository and install the generator:

```bash
# Clone the generator repo
git clone https://github.com/AmnadTaowsoam/generator-python-ai-server.git
cd generator-python-ai-server

# Install dependencies
npm install

# Link it globally so yo can find it
npm link
```

## Usage

Generate a new Python AI server project:

```bash
yo python-ai-server
```

You'll be prompted for:

* **projectName**: Name of your new project (a folder with this name will be created)
* **description**: A brief description of your project

After answering, the generator will scaffold a directory structure like:

```
projectName/
├── app/
│   └── api/
│       └── v1/
│           ├── __init__.py
│           └── endpoints.py
├── models/
│   ├── __init__.py
│   └── predict_result_model.py
├── services/
│   ├── __init__.py
│   ├── predictor_service.py
│   └── result_processor_service.py
├── utils/
│   ├── __init__.py
|   └── logger.py
├── config.py
├── database.py
├── main.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env            # copied from .env.example
└── README.md       # this file
```

## After Generation

1. Change into your new project folder:

   ```bash
   cd projectName
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. (Optional) Run the server locally:

   ```bash
   python -m app.main.py
   ```

4. (Optional) Using Docker:

   ```bash
   docker-compose up --build
   ```

## Customizing Templates

All Handlebars templates live under `generators/app/templates`. You can modify any `.hbs` file to change the scaffolded code or add new files.

- Templates use variables from the prompts (e.g., `{{projectName}}`, `{{description}}`).
- To adjust the default values or add new prompts, edit `generators/app/index.js`.

## Testing the Generator

Make sure your generator works as expected:

```bash
npm test
```

This runs any Mocha specs you have in the `test/` directory.

## Uninstalling the Generator

If you need to unlink the generator:

```bash
npm unlink
```

This will remove the global link and revert to any published version (if installed).

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

## License

MIT © AmnadTaowsoam
