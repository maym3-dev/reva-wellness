/**
 * Countries for the phone-prefix picker and nationality field.
 * Format: "ISO2|Name|dial code". Flags are derived from the ISO code.
 */
const RAW = `AF|Afghanistan|93
AL|Albania|355
DZ|Algeria|213
AD|Andorra|376
AO|Angola|244
AR|Argentina|54
AM|Armenia|374
AU|Australia|61
AT|Austria|43
AZ|Azerbaijan|994
BS|Bahamas|1
BH|Bahrain|973
BD|Bangladesh|880
BB|Barbados|1
BY|Belarus|375
BE|Belgium|32
BZ|Belize|501
BJ|Benin|229
BT|Bhutan|975
BO|Bolivia|591
BA|Bosnia and Herzegovina|387
BW|Botswana|267
BR|Brazil|55
BN|Brunei|673
BG|Bulgaria|359
BF|Burkina Faso|226
KH|Cambodia|855
CM|Cameroon|237
CA|Canada|1
CL|Chile|56
CN|China|86
CO|Colombia|57
CR|Costa Rica|506
HR|Croatia|385
CU|Cuba|53
CY|Cyprus|357
CZ|Czech Republic|420
DK|Denmark|45
DO|Dominican Republic|1
EC|Ecuador|593
EG|Egypt|20
SV|El Salvador|503
EE|Estonia|372
ET|Ethiopia|251
FJ|Fiji|679
FI|Finland|358
FR|France|33
GE|Georgia|995
DE|Germany|49
GH|Ghana|233
GR|Greece|30
GT|Guatemala|502
HN|Honduras|504
HK|Hong Kong|852
HU|Hungary|36
IS|Iceland|354
IN|India|91
ID|Indonesia|62
IR|Iran|98
IQ|Iraq|964
IE|Ireland|353
IL|Israel|972
IT|Italy|39
CI|Ivory Coast|225
JM|Jamaica|1
JP|Japan|81
JO|Jordan|962
KZ|Kazakhstan|7
KE|Kenya|254
KW|Kuwait|965
KG|Kyrgyzstan|996
LA|Laos|856
LV|Latvia|371
LB|Lebanon|961
LY|Libya|218
LI|Liechtenstein|423
LT|Lithuania|370
LU|Luxembourg|352
MO|Macau|853
MG|Madagascar|261
MY|Malaysia|60
MV|Maldives|960
MT|Malta|356
MU|Mauritius|230
MX|Mexico|52
MD|Moldova|373
MC|Monaco|377
MN|Mongolia|976
ME|Montenegro|382
MA|Morocco|212
MZ|Mozambique|258
MM|Myanmar|95
NA|Namibia|264
NP|Nepal|977
NL|Netherlands|31
NZ|New Zealand|64
NI|Nicaragua|505
NG|Nigeria|234
MK|North Macedonia|389
NO|Norway|47
OM|Oman|968
PK|Pakistan|92
PA|Panama|507
PG|Papua New Guinea|675
PY|Paraguay|595
PE|Peru|51
PH|Philippines|63
PL|Poland|48
PT|Portugal|351
PR|Puerto Rico|1
QA|Qatar|974
RO|Romania|40
RU|Russia|7
RW|Rwanda|250
SA|Saudi Arabia|966
SN|Senegal|221
RS|Serbia|381
SC|Seychelles|248
SG|Singapore|65
SK|Slovakia|421
SI|Slovenia|386
ZA|South Africa|27
KR|South Korea|82
ES|Spain|34
LK|Sri Lanka|94
SE|Sweden|46
CH|Switzerland|41
TW|Taiwan|886
TJ|Tajikistan|992
TZ|Tanzania|255
TH|Thailand|66
TL|Timor-Leste|670
TT|Trinidad and Tobago|1
TN|Tunisia|216
TR|Turkey|90
TM|Turkmenistan|993
UG|Uganda|256
UA|Ukraine|380
AE|United Arab Emirates|971
GB|United Kingdom|44
US|United States|1
UY|Uruguay|598
UZ|Uzbekistan|998
VE|Venezuela|58
VN|Vietnam|84
ZM|Zambia|260
ZW|Zimbabwe|263`;

export type Country = { iso: string; name: string; dial: string; flag: string };

const flagOf = (iso: string) => String.fromCodePoint(...[...iso].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

export const COUNTRIES: Country[] = RAW.split("\n").map((line) => {
  const [iso, name, dial] = line.split("|");
  return { iso, name, dial: `+${dial}`, flag: flagOf(iso) };
});

/** REVA's main source markets, shown first. */
const TOP = ["TH", "US", "GB", "AU", "DE", "FR", "SG", "CN", "JP", "KR", "IN", "RU", "AE"];

export const COUNTRIES_FEATURED: Country[] = [
  ...TOP.map((iso) => COUNTRIES.find((c) => c.iso === iso)!),
  ...COUNTRIES.filter((c) => !TOP.includes(c.iso)),
];

export const countryByIso = (iso: string) => COUNTRIES.find((c) => c.iso === iso);
