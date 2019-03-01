// load express app and export router
var express = require('express');	
var router = module.exports = express.Router();

// load the dependeces
var schema = require('express-jsonschema');
var acl = require("express-dynacl");

var etlFilter = require("../middleware/etl-filter");

const { sequelize, Record, Counterparty } = require("../db");
const Op = require("sequelize").Op;

// REQUEST: get event

router.get("/search", /*etlFilter({visible:true}), acl("counterparty","list"),*/ async (req,res,next) => {

  console.log("searching... " + req.query.search);
  
  const query = Counterparty.findAll({
    attributes: ["id","name"],
    where: {
      name: { [Op.like]: `%${req.query.search}%` }
    }
  });
  
  res.json(await query);
});

router.get("/top", etlFilter({visible:true}), acl("counterparty","list"), async (req,res,next) => {
  const counterparties = await Counterparty.aggregate([
    { $match: { etl: {$in: req.etls}} },
    { $group: { _id: "$counterpartyId", name: { $first: "$name" }, amount: { $sum: "$expenditureAmount" } } },
    { $sort: { amount: -1 } },
    { $limit: 100 }
  ]);
  
  res.json(counterparties);
});

router.get("/:id", etlFilter({visible:true}), acl("counterparty", "read"), async (req,res,next) => {

  var counterparty = await Counterparty.aggregate([
    { $match: { counterpartyId: req.params.id, etl: {$in: req.etls}} },
    { $group: { _id: "$counterpartyId", name: { $first: "$name" } } }
  ])

  if(!counterparty[0]) return res.sendStatus(404);

  res.json(counterparty[0]);
});

router.get("/:id/budgets", etlFilter({visible:true}), acl("counterparty", "read"), async (req,res,next) => {

  var budgets = await Counterparty.find({ counterpartyId:req.params.id, etl: {$in: req.etls}}).populate("profile","_id name");

  res.json(budgets);
  
});

router.get("/:id/payments", etlFilter({visible:true}), acl("counterparty", "read"), async (req,res,next) => {

  var payments = await Payment.find({ counterpartyId:req.params.id, etl: {$in: req.etls}});

  res.json(payments);
  
});