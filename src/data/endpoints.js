export function getEndpoint(resource, endpoint) {
  let res = endpointsMap[resource];
  if (!res) { return; }

  return res.endpoints[endpoint];
}

export function getTemplate(...args) {
  let ep = getEndpoint(...args)
  if (!ep) { return; }

  return ep.path;
}

export const endpointsMap = {
  'accounts': {
    'label': 'حساب‌ها',
    'endpoints': {
      'single': {
        'label': 'اطلاعات حساب شما ',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/accounts-single.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}',
        },
        'fields': [{name: 'balances', fields: ['balance', 'asset_code'], array: true}, 'sequence', 'subentry_count'],
        'setupComponent': require('../components/SetupPanes/SingleAccount'),
      }
    }
  },
  'assets': {
    'label': 'دارایی‌ها',
    'endpoints': {
      'single': {
        'label': 'همه دارایی‌ها ',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/endpoints/assets-all.html',
        'method': 'GET',
        'path': {
          template: '/assets{?asset_code,asset_issuer,cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['amount','asset_code', 'asset_issuer'], array: true}],
        'setupComponent': require('../components/SetupPanes/AllAssets'),
      }
    }
  },
  'effects': {
    'label': 'شرح جزییات عملیات',
    'endpoints': {
      'all': {
        'label': 'شرح همه جزییات عملیات ',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-all.html',
        'method': 'GET',
        'path': {
          template: '/effects{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account', 'starting_balance','created_at','type','weight'], array: true}],
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'for_account': {
        'label': 'شرح جزییات عملیات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/effects{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','type','weight'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'شرح جزییات عملیات دفتر کل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/effects{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','type','weight'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_operation': {
        'label': 'شرح جزییات عملیات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-operation.html',
        'method': 'GET',
        'path': {
          template: '/operations/{operation}/effects{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','type','weight'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForOperation'),
      },
      'for_transaction': {
        'label': 'شرح جزییات عملیات تراکنش',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/effects{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','type','weight'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'ledgers': {
    'label': 'دفتر کل',
    'endpoints': {
      'all': {
        'label': 'همه دفتر کل ها',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/ledgers-all.html',
        'method': 'GET',
        'path': {
          template: '/ledgers{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['sequence','successful_transaction_count','failed_transaction_count', 'operation_count','closed_at'], array: true}],
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': 'تک حالت از دفتر کل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/ledgers-single.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}',
        },
        'fields': ['sequence','successful_transaction_count','failed_transaction_count', 'operation_count','closed_at'],
        'setupComponent': require('../components/SetupPanes/SingleLedger'),
      }
    }
  },
  'offers': {
    'label': 'پیشنهادات',
    'endpoints': {
      'for_account': {
        'label': 'پیشنهادات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/offers-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/offers{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['seller','id','amount', 'price'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      }
    }
  },
  'operations': {
    'label': 'عملیات',
    'endpoints': {
      'all': {
        'label': 'همه عملیات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-all.html',
        'method': 'GET',
        'path': {
          template: '/operations{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','funder','transaction_successful','type'], array: true}],
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': 'یک عملیات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-single.html',
        'method': 'GET',
        'path': {
          template: '/operations/{operation}',
        },
        'fields': [{name: 'records', fields: ['account','funder','transaction_successful','type'], array: true}],
        'setupComponent': require('../components/SetupPanes/SingleOperation'),
      },
      'for_account': {
        'label': 'عملیات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/operations{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','funder','transaction_successful','type'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'عملیات دفتر کل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/operations{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','funder','transaction_successful','type'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_transaction': {
        'label': 'عملیات تراکنش',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/operations{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','funder','transaction_successful','type'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'order_book': {
    'label': 'دفتر سفارش‌ها',
    'endpoints': {
      'details': {
        'label': 'جزییات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/orderbook-details.html',
        'method': 'GET',
        'path': {
          template: '/order_book{?selling_asset_type,selling_asset_code,selling_asset_issuer,buying_asset_type,buying_asset_code,buying_asset_issuer}',
          'selling_asset_type': 'selling_asset.type',
          'selling_asset_code': 'selling_asset.code',
          'selling_asset_issuer': 'selling_asset.issuer',
          'buying_asset_type': 'buying_asset.type',
          'buying_asset_code': 'buying_asset.code',
          'buying_asset_issuer': 'busource ying_asset.issuer',
        },
        'fields': [{name: 'bids', fields: ['price', 'amount'], array: true},
          {name: 'asks', fields: ['price', 'amount'], array: true}],
        'setupComponent': require('../components/SetupPanes/OrderBookDetails'),
      }
    }
  },
  'paths': {
    'label': 'مسیرها',
    'endpoints': {
      'all': {
        'label': 'یافتن مسیر پرداخت',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/path-finding.html',
        'method': 'GET',
        'path': {
          template: '/paths{?source_account,destination_account,destination_asset_type,destination_asset_code,destination_asset_issuer,destination_amount}',
          'destination_asset_type': 'destination_asset.type',
          'destination_asset_code': 'destination_asset.code',
          'destination_asset_issuer': 'destination_asset.issuer',
        },
        'fields': [{name: 'records', fields: ['destination_amount', 'destination_asset_code','source_amount','source_asset_code'], array: true}],
        'setupComponent': require('../components/SetupPanes/FindPaymentPaths'),
      }
    }
  },
  'payments': {
    'label': 'پرداخت‌ها',
    'endpoints': {
      'all': {
        'label': 'همه پرداخت‌ها',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-all.html',
        'method': 'GET',
        'path': {
          template: '/payments{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['source_account','type','starting_balance','funder','account'], array: true}],
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'for_account': {
        'label': 'پرداخت‌های حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/payments{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['sender', 'receiver', 'type'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'پرداخت‌های دفتر کل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/payments{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['funder', 'starting_balance', 'account'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_transaction': {
        'label': 'پرداخت‌های تراکنش',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/payments{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['funder', 'starting_balance', 'account'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'trade_aggregations': {
    'label': 'تجمیع معاملات',
    'endpoints': {
      'all': {
        'label': 'تجمیع معاملات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/endpoints/trade_aggregations.html',
        'method': 'GET',
        'path': {
          template: '/trade_aggregations{?base_asset_type,base_asset_code,base_asset_issuer,counter_asset_type,counter_asset_code,counter_asset_issuer,start_time,end_time,resolution,limit,order}',
          'base_asset_type': 'base_asset.type',
          'base_asset_code': 'base_asset.code',
          'base_asset_issuer': 'base_asset.issuer',
          'counter_asset_type': 'counter_asset.type',
          'counter_asset_code': 'counter_asset.code',
          'counter_asset_issuer': 'counter_asset.issuer',
          'start_time': 'start_time',
          'end_time': 'end_time',
          'resolution': 'resolution'
        },
        'fields': [{name: 'records', fields: ['timestamp', 'trade_count', 'base_volume', 'count_volume'], array: true}],
        'setupComponent': require('../components/SetupPanes/TradeAggregations'),
      },
    }
  },
  'trades': {
    'label': 'معاملات',
    'endpoints': {
      'all': {
        'label': 'همه معاملات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/endpoints/trades.html',
        'method': 'GET',
        'path': {
          template: '/trades{?base_asset_type,base_asset_code,base_asset_issuer,counter_asset_type,counter_asset_code,counter_asset_issuer,offer_id,cursor,limit,order}',
          'base_asset_type': 'base_asset.type',
          'base_asset_code': 'base_asset.code',
          'base_asset_issuer': 'base_asset.issuer',
          'counter_asset_type': 'counter_asset.type',
          'counter_asset_code': 'counter_asset.code',
          'counter_asset_issuer': 'counter_asset.issuer',
          'offer_id': 'offer_id'
        },
        'fields': [{name: 'records', fields: ['ledger_close_time','base_account','base_ammount','base_asset_type','counter_account','counter_amount','counter_asset_type','counter_asset_code','counter_asset_issue'], array: true}],

        'setupComponent': require('../components/SetupPanes/Trades'),
      },
      'for_account': {
        'label': 'معاملات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/trades-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/trades{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['base_account', 'base_amount', 'counter_account', 'counter_amount'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_offer': {
        'label': 'معاملات یک سفارش ',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/trades-for-offer.html',
        'method': 'GET',
        'path': {
          template: '/offers/{offer_id}/trades{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['base_account', 'base_amount', 'counter_account', 'counter_amount'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForOffer'),
      },
    }
  },
  'transactions': {
    'label': 'تراکنش‌ها',
    'endpoints': {
      'all': {
        'label': 'همه تراکنش‌ها',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-all.html',
        'method': 'GET',
        'path': {
          template: '/transactions{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['created_at', 'hash', 'source_account', 'fee'], array: true}],
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': 'اطلاعات یک تراکنش‌',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-single.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}',
        },
        'fields': ['account','account_sequence','hash','ledger','envelope_xdr'],
        'setupComponent': require('../components/SetupPanes/SingleTransaction'),
      },
      'create': {
        'label': 'تراکنش‌های سابق',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-create.html',
        'method': 'POST',
        'disableStreaming': true,
        'path': {
          template: '/transactions',
        },
        'fields': ['hash','ledger','envelope_xdr'],
        'setupComponent': require('../components/SetupPanes/PostTransaction'),
      },
      'for_account': {
        'label': 'تراکنشهای حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/transactions{?cursor,limit,order}',
        },
        'fields': ['account','account_sequence','hash','ledger','envelope_xdr'],
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'تراکنش‌های دفتر کل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/transactions{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['account','hash','fee_paid'], array: true}],
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      }
    }
  }
};
