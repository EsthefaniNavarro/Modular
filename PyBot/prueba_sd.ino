#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "FS.h"
#include "SD.h"
#include "SPI.h"

// Credenciales WiFi
const char* ssid = "Fastnet-85874";
const char* password = "fastnetaguas";

// Pines de control para el L298N
const int IN1 = 32;
const int IN2 = 33;
const int IN3 = 25;
const int IN4 = 26;

// Puerto del servidor
AsyncWebServer server(80);

// Inicializar la tarjeta SD
bool initSD() {
  if (!SD.begin()) {
    Serial.println("¡Error al inicializar la tarjeta SD!");
    return false;
  }
  Serial.println("Tarjeta SD inicializada correctamente.");
  return true;
}

// Configurar pines
void setupMotors() {
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  // Asegurarse de que los motores estén detenidos al inicio
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

// Funciones para movimientos básicos
void avanzar() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void retroceder() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void girarIzquierda() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void girarDerecha() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void detenerMotores() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

// Configuración inicial
void setup() {
  Serial.begin(115200);

  // Conexión WiFi
  Serial.println("Conectando a WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print("."); //Imprime un punto por cada segundo que pasa
  }
  Serial.println("\nConexión WiFi establecida.");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP()); //Imprime la dirección IP asignada

  // Inicializar la tarjeta SD
  if (!initSD()) {
    while (true) {
      delay(1000); 
    }
  }

  // Configurar pines de motores
  setupMotors(); 

  // Configurar servidor
  server.on("/", HTTP_GET, [](AsyncWebServerRequest* request) {
    request->send(SD, "/uso_libre.html", "text/html"); //Enviar archivo HTML
  });

  // Endpoints para los comandos
  server.on("/avanzar", HTTP_GET, [](AsyncWebServerRequest* request) {
    avanzar(); 
    request->send(200, "text/plain", "Avanzar");
  });

  server.on("/retroceder", HTTP_GET, [](AsyncWebServerRequest* request) {
    retroceder();
    request->send(200, "text/plain", "Retroceder");
  });

  server.on("/izquierda", HTTP_GET, [](AsyncWebServerRequest* request) {
    girarIzquierda();
    request->send(200, "text/plain", "Izquierda");
  });

  server.on("/derecha", HTTP_GET, [](AsyncWebServerRequest* request) {
    girarDerecha();
    request->send(200, "text/plain", "Derecha");
  });

  server.on("/detener", HTTP_GET, [](AsyncWebServerRequest* request) {
    detenerMotores();
    request->send(200, "text/plain", "Detener");
  });

  // Manejar archivos desde la tarjeta SD
  server.serveStatic("/", SD, "/").setDefaultFile("uso_libre.html");

  server.begin();
  Serial.println("Servidor iniciado.");
}

void loop() {
  // El loop queda vacío, ya que AsyncWebServer maneja todo.
}
