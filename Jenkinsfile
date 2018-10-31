pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        echo "Install dependencies ..."
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        echo "Run tests ..."
        sh 'npm test'
      }
    }
    stage('Build') {
      steps {
        echo "Run build ..."
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploy to apis.frederikheld.de ...'
        withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
            sh 'curl -T dist/usmio.min.js ftp://apis.frederikheld.de/ -u $FTP_USER:$FTP_PW --ftp-ssl --insecure'
        }
      }
    }
  }
}
