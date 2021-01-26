pipeline {
    agent any

    environment {
        registry = "rohan2567/node-app-demo"
        registryCredential = 'dockerhub'
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
                    dockerImage = docker.build registry + ":$BUILD_ID"
                }
            }
        }
       
        stage('Push docker image to Dockerhub') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push("latest")
						dockerImage.push("$BUILD_ID")
                    }
                }
            }
        }
        
        stage('Deploy to k8s Cluster') {
            steps {
                kubernetesDeploy(
                    configs: 'demo.yaml',
                    kubeconfigId: 'kubeconfig'
                    )
                }
            }
		
		stage('Cleaning up') {
            steps {
                sh "docker rmi $registry:$BUILD_ID"
            }
        }   
}
}
