# Use the official OpenJDK image for building and running the app
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and project files
COPY . /app

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/hrmanagement-0.0.1-SNAPSHOT.jar"]
