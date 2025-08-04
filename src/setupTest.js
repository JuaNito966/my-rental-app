// src/setupTests.js
import fetchMock from 'jest-fetch-mock';

// Habilitar los mocks de fetch
fetchMock.enableMocks();

// Asegurar que fetch esté disponible globalmente
global.fetch = fetchMock;