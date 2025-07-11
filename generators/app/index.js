const Generator = require('yeoman-generator').default;

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      // ชื่อ service
      {
        type: 'input',
        name: 'name',
        message: 'Service name:',
        default: 'auth-service'
      },
      // พอร์ต
      {
        type: 'input',
        name: 'port',
        message: 'Port to run on:',
        default: '3000'
      },
      // Database config
      {
        type: 'input',
        name: 'dbHost',
        message: 'DB_HOST:',
        default: 'localhost'
      },
      {
        type: 'input',
        name: 'dbPort',
        message: 'DB_PORT:',
        default: '5432'
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'DB_NAME:',
        default: 'authen_db'
      },
      {
        type: 'input',
        name: 'dbUser',
        message: 'DB_USER:',
        default: 'postgres'
      },
      {
        type: 'password',
        name: 'dbPass',
        message: 'DB_PASSWORD:',
        default: 'password'
      },
      // Additional settings
      {
        type: 'input',
        name: 'apiKey',
        message: 'API_KEY:',
        default: ''
      },
      {
        type: 'input',
        name: 'jwtSecret',
        message: 'JWT_SECRET_KEY:',
        default: 'your_jwt_secret'
      },
      {
        type: 'input',
        name: 'secretKey',
        message: 'SECRET_KEY:',
        default: 'your_secret_key'
      },
      {
        type: 'input',
        name: 'tokenExpiration',
        message: 'TOKEN_EXPIRATION_MINUTES:',
        default: '60'
      },
      {
        type: 'input',
        name: 'connectTimeout',
        message: 'CONNECTION_TIMEOUT (ms):',
        default: '5000'
      },
      {
        type: 'input',
        name: 'readTimeout',
        message: 'READ_TIMEOUT (ms):',
        default: '5000'
      },
      {
        type: 'input',
        name: 'algorithm',
        message: 'ALGORITHM:',
        default: 'HS256'
      },
      {
        type: 'list',
        name: 'logLevel',
        message: 'LOG_LEVEL:',
        choices: ['debug', 'info', 'warn', 'error'],
        default: 'info'
      }
    ]);
  }

  /**
   * Write template files and copy .env
   */
  writing() {
    const { name } = this.answers;
    const targetDir = this.destinationPath(name);

    // 1) Copy all templates, inject answers, strip .hbs from filenames
    this.fs.copyTpl(
      this.templatePath('**/*'),
      targetDir,
      this.answers,
      {}, // use empty templateOptions instead of null
      {
        globOptions: {
          dot: true,
          ignore: ['**/node_modules/**', '**/*.lock'],
        },
        processDestinationPath: filePath =>
          filePath.endsWith('.hbs')
            ? filePath.replace(/\.hbs$/, '')
            : filePath,
      }
    );

    // 2) Copy .env.example to .env from templates
    this.fs.copy(
      this.templatePath('.env.example'),
      this.destinationPath(name, '.env')
    );
  }

  /**
   * Install Python dependencies via pip
   */
  install() {
    const { name } = this.answers;
    const targetDir = this.destinationPath(name);
    this.log(`Installing Python dependencies in ${name}...`);
    this.spawnCommandSync('pip', ['install', '-r', 'requirements.txt'], { cwd: targetDir });
  }
};

