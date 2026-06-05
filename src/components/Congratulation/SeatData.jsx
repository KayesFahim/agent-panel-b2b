export const SeatData = {
  _declaration: {
    _attributes: {
      version: '1.0',
      encoding: 'UTF-8',
    },
  },
  'soap-env:Envelope': {
    _attributes: {
      'xmlns:soap-env': 'http://schemas.xmlsoap.org/soap/envelope/',
    },
    'soap-env:Header': {
      'eb:MessageHeader': {
        _attributes: {
          'xmlns:eb': 'http://www.ebxml.org/namespaces/messageHeader',
          'eb:version': '1.0',
          'soap-env:mustUnderstand': '1',
        },
        'eb:From': {
          'eb:PartyId': {
            _attributes: {
              'eb:type': 'URI',
            },
            _text: 'Sabre_API',
          },
        },
        'eb:To': {
          'eb:PartyId': {
            _attributes: {
              'eb:type': 'URI',
            },
            _text: 'GLOBAL TRAVEL',
          },
        },
        'eb:ConversationId': {
          _text: '2021.01.DevStudio',
        },
        'eb:Action': {
          _text: 'EnhancedSeatMapRS',
        },
        'eb:MessageData': {
          'eb:MessageId': {
            _text: '1240160685270840630',
          },
          'eb:Timestamp': {
            _text: '2024-01-08T19:02:07',
          },
        },
      },
      'wsse:Security': {
        _attributes: {
          'xmlns:wsse': 'http://schemas.xmlsoap.org/ws/2002/12/secext',
        },
        'wsse:BinarySecurityToken': {
          _attributes: {
            valueType: 'String',
            EncodingType: 'wsse:Base64Binary',
          },
          _text:
            'Shared/IDL:IceSess\\/SessMgr:1\\.0.IDL/Common/!ICESMS\\/ACPCRTD!ICESMSLB\\/CRT.LB!1704740526835!2149!537!1',
        },
      },
    },
    'soap-env:Body': {
      EnhancedSeatMapRS: {
        _attributes: {
          xmlns: 'http://stl.sabre.com/Merchandising/v5',
          'xmlns:ns2': 'http://opentravel.org/common/message/v02',
          'xmlns:ns3': 'http://services.sabre.com/STL_Payload/v02_00',
          'xmlns:ns4': 'http://services.sabre.com/STL/v02',
          'xmlns:ns5': 'http://opentravel.org/common/v02',
          'xmlns:ns6': 'http://stl.sabre.com/Merchandising/diagnostics/v1',
        },
        'ns3:ApplicationResults': {
          _attributes: {
            status: 'Complete',
          },
        },
        SeatMap: {
          _attributes: {
            changeOfGaugeInd: 'false',
          },
          Equipment: {
            _text: '77W',
          },
          Flight: {
            _attributes: {
              destination: 'DXB',
              origin: 'DAC',
            },
            DepartureDate: {
              _text: '2024-03-14',
            },
            Operating: {
              _attributes: {
                carrier: 'EK',
              },
              _text: '585',
            },
            Marketing: {
              _attributes: {
                carrier: 'EK',
              },
              _text: '585',
            },
          },
          FareAvailQualifiers: {
            _attributes: {
              passengerType: 'ADT',
              accompaniedByInfantInd: 'false',
            },
            TravellerID: {
              _text: '1',
            },
          },
          Cabin: {
            _attributes: {
              firstRow: '17',
              lastRow: '50',
              seatOccupationDefault: 'Free',
            },
            CabinClass: {
              RBD: {
                _text: 'Y',
              },
              MarketingDescription: {
                _text: 'PRICE PER SEAT:PKR 0-PKR 2999',
              },
            },
            Row: [
              {
                RowNumber: {
                  _text: '17',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatWithBassinetFacility',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatWithBassinetFacility',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '18',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '19',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '20',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '21',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                RowFacility: {
                  Location: {
                    _text: 'Middle',
                  },
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'true',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'PreferredSeat/PreferentialSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '22',
                },
                Type: {
                  _text: 'RowDoesNotExist',
                },
              },
              {
                RowNumber: {
                  _text: '23',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'BulkheadSeat',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'ChargeableSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatWithBassinetFacility',
                        },
                      },
                      {
                        Detail: {
                          _text: 'LegSpaceSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '0',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '24',
                },
                Type: [
                  {
                    _text: 'ExitRow',
                  },
                  {
                    _text: 'OverwingRow',
                  },
                ],
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'ExitRowSeat',
                      },
                    },
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'ExitRowSeat',
                      },
                    },
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'ExitRowSeat',
                      },
                    },
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'ExitRowSeat',
                      },
                    },
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'ExitRowSeat',
                      },
                    },
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'ExitRowSeat',
                      },
                    },
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '25',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '26',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '27',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '28',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '29',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '30',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '31',
                },
                Type: {
                  _text: 'OverwingRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '32',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '33',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '34',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '35',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '36',
                },
                RowFacility: {
                  Location: {
                    _text: 'Middle',
                  },
                  Facility: [
                    {
                      Characteristics: {
                        _text: 'Galley',
                      },
                      Location: {
                        _text: 'CenterSection',
                      },
                    },
                    {
                      Characteristics: {
                        _text: 'Lavatory',
                      },
                      Location: {
                        _text: 'RightSideSection',
                      },
                    },
                  ],
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '37',
                },
                Type: {
                  _text: 'ExitRow',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: [
                      {
                        Detail: {
                          _text: 'BulkheadSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'ExitRowSeat',
                        },
                      },
                    ],
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: [
                      {
                        Detail: {
                          _text: 'BulkheadSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'ExitRowSeat',
                        },
                      },
                    ],
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: [
                      {
                        Detail: {
                          _text: 'BulkheadSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'ExitRowSeat',
                        },
                      },
                    ],
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Limitations: {
                      Detail: {
                        _text: 'NoSeat Galley',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Limitations: {
                      Detail: {
                        _text: 'NoSeat Galley',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Limitations: {
                      Detail: {
                        _text: 'NoSeat Galley',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Limitations: {
                      Detail: {
                        _text: 'NoSeat Galley',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: [
                      {
                        Detail: {
                          _text: 'BulkheadSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'ExitRowSeat',
                        },
                      },
                    ],
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: [
                      {
                        Detail: {
                          _text: 'BulkheadSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'ExitRowSeat',
                        },
                      },
                    ],
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'true',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'true',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: [
                      {
                        Detail: {
                          _text: 'BulkheadSeat',
                        },
                      },
                      {
                        Detail: {
                          _text: 'ExitRowSeat',
                        },
                      },
                    ],
                    Limitations: [
                      {
                        Detail: {
                          _text: 'NotAllowedForInfants',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatNotSuitableForChild',
                        },
                      },
                    ],
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '2999',
                        },
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '38',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'SeatSuitableForUnaccompaniedMinors',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'SeatSuitableForUnaccompaniedMinors',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: [
                      {
                        Detail: {
                          _text: 'SeatSuitableForUnaccompaniedMinors',
                        },
                      },
                      {
                        Detail: {
                          _text: 'SeatSuitableForAdultWithInfant',
                        },
                      },
                    ],
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'true',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsOccupied',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForAdultWithInfant',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForAdultWithInfant',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '39',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForUnaccompaniedMinors',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForUnaccompaniedMinors',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForUnaccompaniedMinors',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text:
                          'SeatWithFacilitiesForHandicapped/IncapacitatedPassenger',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '40',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForUnaccompaniedMinors',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForUnaccompaniedMinors',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'SeatSuitableForUnaccompaniedMinors',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '41',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '42',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '43',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '44',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '45',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '46',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '47',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '48',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '49',
                },
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                ],
              },
              {
                RowNumber: {
                  _text: '50',
                },
                RowFacility: [
                  {
                    Location: {
                      _text: 'Rear',
                    },
                    Facility: {
                      Characteristics: {
                        _text: 'Galley',
                      },
                      Location: {
                        _text: 'LeftSideSection',
                      },
                    },
                  },
                  {
                    Location: {
                      _text: 'Rear',
                    },
                    Facility: [
                      {
                        Characteristics: {
                          _text: 'Galley',
                        },
                        Location: {
                          _text: 'LeftSideSection',
                        },
                      },
                      {
                        Characteristics: {
                          _text: 'Galley',
                        },
                        Location: {
                          _text: 'CenterSection',
                        },
                      },
                      {
                        Characteristics: {
                          _text: 'Galley',
                        },
                        Location: {
                          _text: 'RightSideSection',
                        },
                      },
                    ],
                  },
                ],
                Seat: [
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'A',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'B',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Limitations: {
                      Detail: {
                        _text: 'RestrictedGeneral',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'C',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'D',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'E',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'F',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'G',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'true',
                      premiumInd: 'false',
                      chargeableInd: 'false',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'H',
                    },
                    Location: {
                      Detail: {
                        _text: 'NoSeatAtThisLocation',
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'J',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                  {
                    _attributes: {
                      occupiedInd: 'false',
                      inoperativeInd: 'false',
                      premiumInd: 'false',
                      chargeableInd: 'true',
                      exitRowInd: 'false',
                      restrictedReclineInd: 'false',
                      noInfantInd: 'false',
                    },
                    Number: {
                      _text: 'K',
                    },
                    Occupation: {
                      Detail: {
                        _text: 'SeatIsFree',
                      },
                    },
                    Location: {
                      Detail: {
                        _text: 'TailSectionOfAircraft',
                      },
                    },
                    Facilities: {
                      Detail: {
                        _text: 'ChargeableSeat',
                      },
                    },
                    PassengerEntitlementAndPrice: {
                      _attributes: {
                        entitledInd: 'true',
                      },
                      TravellerID: {
                        _text: '1',
                      },
                      Price: {
                        TotalAmount: {
                          _attributes: {
                            currencyCode: 'PKR',
                          },
                          _text: '1949',
                        },
                      },
                    },
                  },
                ],
              },
            ],
            Column: [
              {
                Column: {
                  _text: 'A',
                },
                Characteristics: {
                  _text: 'Window',
                },
              },
              {
                Column: {
                  _text: 'B',
                },
                Characteristics: {
                  _text: 'CenterSeat',
                },
              },
              {
                Column: {
                  _text: 'C',
                },
                Characteristics: {
                  _text: 'Aisle',
                },
              },
              {
                Column: {
                  _text: 'D',
                },
                Characteristics: {
                  _text: 'Aisle',
                },
              },
              {
                Column: {
                  _text: 'E',
                },
                Characteristics: {
                  _text: 'CenterSeat',
                },
              },
              {
                Column: {
                  _text: 'F',
                },
                Characteristics: {
                  _text: 'CenterSeat',
                },
              },
              {
                Column: {
                  _text: 'G',
                },
                Characteristics: {
                  _text: 'Aisle',
                },
              },
              {
                Column: {
                  _text: 'H',
                },
                Characteristics: {
                  _text: 'Aisle',
                },
              },
              {
                Column: {
                  _text: 'J',
                },
                Characteristics: {
                  _text: 'CenterSeat',
                },
              },
              {
                Column: {
                  _text: 'K',
                },
                Characteristics: {
                  _text: 'Window',
                },
              },
            ],
          },
        },
      },
    },
  },
};
