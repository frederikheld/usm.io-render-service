pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        echo "Testing ..."
        npm test
      }
    }
    stage('Minify') {
      steps {
        echo "Building ..."
        sh 'echo "minified js" > usmio.min.js'
        npm run-script build
      }
    }
    stage('Deploy to FTP') {
      steps {
        echo 'Deploying ...'
        withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
            sh 'curl -T usmio.min.js ftp://dev.frederikheld.de/ -u $FTP_USER:$FTP_PW'
        }
      }
    }
  }
}
