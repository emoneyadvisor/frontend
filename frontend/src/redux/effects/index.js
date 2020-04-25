import { put, takeLatest, all } from "redux-saga/effects";

import { setCities, setProfileValue } from "../actions";

import { getStateCode } from "../../utils/select-utils";

function* fetchCities(action) {
  yield takeLatest("fetchCities", function* (action) {
    const response = yield fetch(
      `https://parseapi.back4app.com/classes/Usabystate_${getStateCode(
        action.payload.state
      )}?limit=9999&order=name`,
      {
        headers: {
          "X-Parse-Application-Id": "hUgHiyVF0UBMYiLtopMTSFSH4xmySM5f5WvIqeRH",
          "X-Parse-REST-API-Key": "hryr4Zr9Pf0vUcMilK0A2CIxc7L0Dn2ofLzy9zTP",
        },
      }
    ).then((response) => response.json());
    let cities = response.results.map((result) => result.name);
    cities = cities.filter((item, index) => cities.indexOf(item) === index);

    yield put(setCities(cities));
    yield put(setProfileValue("city", cities[0]));
  });
}

export default function* rootEffect() {
  yield all([fetchCities()]);
}