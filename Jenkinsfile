pipeline {
    agent any

    environment {
        registry = "rohan2567/node-app-demo"
        registryCredential = 'docker'
        dockerImage = ''
    }
   
    stages {
        stage('Checkout github') {
            steps {
               git branch:'master', credentialsId: 'github', url: 'https://github.com/rohan2567/sample-node-app.git'
            }
        }
       
        stage('Build docker image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
       
        stage('push image to dockerhub') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
       
          stage('Cleaning up') {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }

        
       
    
    }
}
