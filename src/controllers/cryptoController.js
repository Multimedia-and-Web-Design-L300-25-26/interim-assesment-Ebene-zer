import Crypto from '../models/Crypto.js';

export const getAllCryptos = async (_req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ name: 1 });
    return res.status(200).json({ count: cryptos.length, data: cryptos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTopGainers = async (_req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ change24h: -1 });
    return res.status(200).json({ count: cryptos.length, data: cryptos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNewListings = async (_req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json({ count: cryptos.length, data: cryptos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body ?? {};

    if (!name || !symbol || price === undefined || change24h === undefined) {
      return res.status(400).json({
        message: 'name, symbol, price and change24h are required.',
      });
    }

    const normalizedSymbol = symbol.toUpperCase();
    const existingCrypto = await Crypto.findOne({ symbol: normalizedSymbol });
    if (existingCrypto) {
      return res.status(400).json({ message: 'Crypto symbol already exists.' });
    }

    const numericPrice = Number(price);
    const numericChange24h = Number(change24h);

    if (Number.isNaN(numericPrice) || Number.isNaN(numericChange24h)) {
      return res.status(400).json({ message: 'price and change24h must be valid numbers.' });
    }

    if (numericPrice < 0) {
      return res.status(400).json({ message: 'price must be greater than or equal to 0.' });
    }

    const crypto = await Crypto.create({
      name,
      symbol: normalizedSymbol,
      price: numericPrice,
      image,
      change24h: numericChange24h,
    });

    return res.status(201).json({ message: 'Crypto created successfully.', data: crypto });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
