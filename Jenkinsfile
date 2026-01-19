pipeline {
    agent any

    environment {
        MAIN_BRANCH = 'main'
        DEVELOP_BRANCH = 'dev'
        AWS_REGION = 'ap-northeast-2'
        if (env.GIT_BRANCH == MAIN_BRANCH) {
            TF_WORKSPACE = 'prod'
        } else {
            TF_WORKSPACE = 'dev'
        }
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout Git Branch') {
            when() {
                expression { env.GIT_BRANCH == MAIN_BRANCH || env.GIT_BRANCH == DEVELOP_BRANCH }
            }

            steps {
                echo 'Clean Workspace'
                cleanWs()
                echo 'Checkout Git Branch and Clone Start'
                checkout([$class: 'GitSCM',
                         branches: [[name: env.GIT_BRANCH]],
                         doGenerateSubmoduleConfigurations: false,
                         userRemoteConfigs: [[credentialsId: 'dundemo_github_token', url: DUNDEMO_FRONT_REPOSITORY]]
                ])
            }

            post {
                failure {
                    echo 'Clone fail'
                    withCredentials([string(credentialsId: 'Discord_Jenkins_Bot', variable: 'DISCORD')]) {
                        discordSend title: "CLONE FAIL",
                        description: "깃허브에서 코드를 클론하는데 실패했습니다.",
                        footer: "'${env.JOB_NAME}'",
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult,
                        webhookURL: "$DISCORD"
                    }
                }
                success {
                    echo 'Clone success'
                    withCredentials([string(credentialsId: 'Discord_Jenkins_Bot', variable: 'DISCORD')]) {
                        discordSend title: "CLONE SUCCESS", 
                        description: "깃허브에서 코드를 클론하는데 성공했습니다.", 
                        footer: "'${env.JOB_NAME}'", 
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult, 
                        webhookURL: "$DISCORD"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Upload to S3') {
            steps {
                script {
                    def bucketName = sh(
                        returnStdout: true,
                        script: """
                            aws resourcegroupstaggingapi get-resource \
                                --resource-type-filters s3 \
                                --tag-filters Key=Name,Values=dundemo_${TF_WORKSPACE}_front_bucket \
                                --query 'ResourceTagMappingList[0].ResourceARN' \
                                --output text
                        """
                    ).trim()

                    if(bucketName) {
                        env.S3_BUCKET = bucketName.split(':')[-1]
                        echo "Found S3 bucket : ${env.S3_BUCKET}"
                        sh "aws s3 sync ${PROJECT_PATH}/dist/ s3://${bucketName} --delete --region ${AWS_REGION}"
                    }
                }
            }

            post {
                success {
                    echo 'Upload to S3 success'
                    withCredentials([string(credentialsId: 'Discord_Jenkins_Bot', variable: 'DISCORD')]) {
                        discordSend title: "S3 UPLOAD SUCCESS",
                        description: "S3에 dist 디렉토리를 업로드하는데 성공했습니다.",
                        footer: "'${env.JOB_NAME}'",
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult,
                        webhookURL: "$DISCORD"
                    }
                }
                failure {
                    echo 'Upload to S3 fail'
                    withCredentials([string(credentialsId: 'Discord_Jenkins_Bot', variable: 'DISCORD')]) {
                        discordSend title: "S3 UPLOAD FAIL",
                        description: "S3에 dist 디렉토리를 업로드하는데 실패했습니다.",
                        footer: "'${env.JOB_NAME}'",
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult,
                        webhookURL: "$DISCORD"
                    }
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                script {
                    def distributionId = sh(
                        script: """
                            aws resourcegroupstaggingapi get-resources \
                                --region ${AWS_REGION} \
                                --resource-type-filters cloudfront:distribution \
                                --tag-filters Key=Name,Values=dundemo_${TF_WORKSPACE}_front_distribution \
                                --query 'ResourceTagMappingList[0].ResourceARN'
                                --output text | awk -F/ '{print \$2}'
                        """,
                        returnStdout: true
                    ).trim()

                    if (distributionId) {
                        echo "Found CloudFront distribution: ${distributionId}"
                        sh "aws cloudfront create-invalidation --distribution-id ${distributionId} --paths '/*' --region ${AWS_REGION}"
                    } else {
                        error "CloudFront distribution not found"
                    }
                }
            }

            post {
                success {
                    echo 'Invalidate CloudFront Cache success'
                    withCredentials([string(credentialsId: 'Discord_Jenkins_Bot', variable: 'DISCORD')]) {
                        discordSend title: "Invalidate CloudFront Cache SUCCESS",
                        description: "클라우드프론트 캐시 무효화에 성공했습니다.",
                        footer: "'${env.JOB_NAME}'",
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult,
                        webhookURL: "$DISCORD"
                    }
                }
                failure {
                    echo 'Invalidate CloudFront Cache fail'
                    withCredentials([string(credentialsId: 'Discord_Jenkins_Bot', variable: 'DISCORD')]) {
                        discordSend title: "Invalidate CloudFront Cache FAIL",
                        description: "클라우드프론트 캐시 무효화에 실패했습니다.",
                        footer: "'${env.JOB_NAME}'",
                        link: env.BUILD_URL,
                        result: currentBuild.currentResult,
                        webhookURL: "$DISCORD"
                    }
                }
            }
        }
    }
}