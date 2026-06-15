
//immediately envoked function does't run into namespacign issues
(() => {

    //const codexURL = 'http://farragofiction.com/CodexOfRuin/viewer.html?name=The%20Wiggler%20Eater&data=N4IgdghgtgpiBcIAqALGACA6gSwOa4BsYAndAUQgBcSQAaEAExgGc9JLsB7MBEAGQC0mAQAYRAZjohi2ZgGteWAIKYplNLGa8AQgCUySpAAla6AIxnxpzGW2mAbPesBJJAGET5y6YDKSvmQ+phZW6D5Ihs5uDk7oAOIAqs58SKYCIaZufADySgDSwd7xSj58znFGqV6hcYZkeWRkAAqFNc66fNrZPkHVUsyUVFqIZAAaSGS6AHL+tBlNkWRTqRn6-s7hUXNWbgm6ztkJQQIAHACstDkAmrPp3kuTcWRIWwLikvQwAB4QAMaUBAAngB9dTEGAwUHYAAOw34QlEEnQAHdsAQCOhcDAwCQIOjAehONDcdR0NgwOh1BgAEZ-OS4YicACuYAYKOw6mZlHQvwgTNYYFw6GhjOpRCgzAAdOhBMIxOIycwyWBedCIGKMJwAGbocFa-nkoVa4hMjmS2ioDAEbhY0iyxEK2Rk3BgTjgtlU9BQN0YEWcDUSykoKjs9GE36-JnEJXqEMQcGUmC-FBgbC8-HoV3ctCkLV8giUc2YNAU6ngv5oNn2+UAciVAyoadDGMGck1FIgPM41uI+pbhowEFZ6GYaGbuogADcIFiUW6CAwY5x0DAQ1TsLmTRz0EO2cm0QxwWBJVJyQNyf9eG5OFBvWBMje7w-b9xTEY8Cg3x-T2BWLgUJQvB8JwyKmMBoEyiBYFQZByJSFQgzJrAYCAYg77-l+GHoNeL73rBpgAGokAS4FSOCIosKw3BATB4HPk+6DoZ+jHfvQDbUmiHIgkQk4wAQvBnGRMAMMCTBatizBwIgIiSiIUjIigHKQmJElSSAABMslSGKdKiTA4m-mpZhafQapEHpBmSbwxlyfQ2BQLgwLMMQvy8ABlDQvAAD0Xl5sQxAztqaYcNwkq-DeXkAFrQGqqacEYnAAuScheUyKACJwKCSrg2Bav0lBuiCTCDGicI+GOBDYG2SrGqahZqDCZhAQi8rjliOIBRmRIkhg5JBjSdIMsyw6opyTLcryBqCsKorilKWAlugADakCwAAuiiEBKgwG5JtQHrLtq4m5pwnAMKY27IsyC6ZjAvGkOCABWe3oLVZoNdC6m8D4TLUs9-xKvGg4MJOsjCZSy7JkmciEhS1ZItwO5etw6hAugtKsMwADc-XoNagokDKLVIk6bA+uduPegmfoBkqnARlGQZxgmNbUMmqbpmjWZkpQNX5pQNYnvQHDQpIiDFtiRNykiLCquD4UoRA5LIZQF28yOgwcL8EOcDDiOduFPZ9pSA7Ss43JOswSsesGFvcgF05YmyCndhgV3EAuS4rmuaAbq9W7cruPKKQuR4ngAvkAA'
    const codexURL = 'http://farragofiction.com/CodexOfRuin/viewer.html?name=Wanda&data=N4IgdghgtgpiBcIDqEwBMIgDQjTAzgJYDmkALoQPZgIgAyAtAGIMAMrAjNiAE6H4BrWgBUAosIAS3MgAsYsfLSQBBAHIARUQCVtWAAQcOAZn0BhUQCEelfYZN6AssoBao28f2iAmm4Me9dADyWupYdvoAygAKyubu9kGBUfGePuqBdCmmOsrCwfpGABzc+GQQZIqIogAaYlqqypnhAJIOMcLNoqrCYR45dM0RHaa9JqYAqlrNgeMRo1hMOm7hXdoA4uLNI3bcMAAeEADGZAA2AJ4A+rI8MDBXhAAOlfRsDFoceoeoegBGMABmfBg6D0qDOejKPGIMDIADp9IxWG8PgB3QgnE56MCUMh6aG48plQ5yNDwvTqShYnF6E4wgKvd56QhgMgwHhHXFo2T0pBsVhGWHcZmlZnHWimShQKDUfQANTZ4IkJBkZkl0rAcoVeiVxBVeglUuoQrARF1ZFoOr18p4iuV+ktmpt2rtzt13EJRxksBZ4rVMr01ttutVho1Aa1Dv1fpoOBuDxu+CIRsQkcDrr1qYjLstJTKP3RhDIl1pADcYCdaAwOABObg3NAXPD-YH4OCIDiw1jcFEyQt3JsttsgViwrg4H4nI4CRsAwe0DtdnAPCC0mfNk1DhdCqDEC74HiHWgyMhkB7wAD05-+EB47OIlH+hGOVDAsMOkvPzmgy7AVAkOJOZkBHPFFUAwfAoAAV2IAAmWEHjAYhc0oG0ZzKdFniQSg0GZX4YHfBQITkPQUHQNk2TwgiCBIsCICIyhoJkUE9HwB5CHZQDEL0SgflbRMX1hAAdMBhKwnCwCZfBuIk2QYE+SDWOYqAzlKBVYT0bU5NAlkpLISkBGxFF9FUURRHUCIIX0wz9DAyS9DRDFmWISyiOsFE9BgMsbVkJyXNkvQHjOG5uP+PReykni+KTCSHxpIDfLo1s+BXPQBHRWkeBcuiV2lUo9H+FD7xPYE9BuMhrDxaAYFhISRLACQ5P4VL0pgNBQRBahzmkuTpUgngTTCprl34xDauE4RiNIvAbkypqfhQiTAUlEjsOZAByKS8HKPVbLOBjPm+TrwT+UrZ1vVqXNw-zW3fEEHjZfBqHUrx9qmijgTQWlEy6-yZBXE4ItC4QeEg2QNr0YR5AeWkbInOS9JpGAIDLUECTAcEKFgPQzjpAjoZhctwUgsAHM45y9Oe-avh4FGIFA8E2Pw6jYr2vrWxOUL81xH5jsLfKUL0AArBS0ZxORMulHh2ZC1LDNpNBoT0YmKExbEfK4praX+bnQeY5d2Jl-4TkocpfJgHH8DGsAkDkCTWZYo4+EfQ45M8krZEoVsXKIMABCZFlKTovAYAedq2owHg-fff5HzDKa6Kam55v6+zCyY-5IIxPFsSIKTbIMygUXlxXYpuFdCzOK2InijWA70PB4wIaL9D5pr-OU1S+AYqTiHYzEuSYuijcLijcPFjycaI8pPmoEtRWo+OXIUuTx4eEepZlsg0RFLjWKOeHKXvX4pz84jShvNG2vKjHKSgCABDkuiwBgdzAObf2iLk4a4T0YThNEHGaBKCYjWFVKSTUCrEzwG1Wyf084nHplJfY-BWQwJBCuRB9kIC6TPgxA8clYpfigD+Kg6lpCPC4IgZouI25yBQoQAAXhdWQ09GAsHYB8ROBA14mkIHDfmmV-LG0oGxRC+hWLsRSuQPqBDQpl0AkWfQuVcRqwgBOcEbC+QcAYMoMO9IWAAEVmiqEFDgCgDwYJKFtr8MuxJWoImYFoyikpqJ334mWLqks5Ln34bZZRXVhZ5TgWFagBBL4sXnsFW6Xl8Cm2oFJAeegtBsA4AAdnUnochDwjC0GaKFZJnBUl2TShiex+inF4B8QWJhUl2RsU+uCWy108wFiLIjDxgMsRIx4DzUEPxsQ8Dvgowg1FjYogopQLyEJCCwAyYwcYfIAAsB0JJ-RRoBKAfY2r4EgocF2iYDonE2VxTRHD66FwkldcKESyCQTia+TJABfIAA'
    const src = `<div style='background: black;color: white;font-family: Courier New;padding: 31px;'><a target='_blank' href ='${codexURL}'>Title: The Lord of the Universe</a>.
    
    <br><Br>
    All Faithful are advised to avoid "Wanda", the self proclaimed "Lord of the Universe" at all costs.

    The "Lord" will send Faithful to an endless maze of hallways, "for the lulz".

    The endless hallways eventually degrade into a series of small rooms with doors to three cardinal directions.

    It is unknown why there is never a fourth door. 

    While the Westerville Mall can, on occasion, lead into the Lords "Horridors", the relatively safety of the Mall is not extended to these godless lands. 

    If you suspect you have left the mall and are instead within the Horridors, turn around. Do not drown.

    The more doors that are entered, the harder it will be to leave the Horridors, likely eventually becoming impossible.

    <u>Exhibit A</u>: Early Horridor doors often have an associated number.
    
    <img style='width: 75%'src ="http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/door2blurry.JPG">
       <br> <img style='width: 75%'src ="http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/door6.JPG">
        <br><img style='width: 75%'src ="http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/door_4.JPG">
        <br><img style='width: 75%'src ="http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/door_5_blurry.JPG">
        <br><img style='width: 75%'src ="http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/door_9.JPG">
        <br><img style='width: 75%'src ="http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/door_10_blurry.JPG">


    <u>Exhibit B</u>: Standard maze video degradation briefly surpressed with <span data-redaction="Sextant">[REDACTED]</span>

    <img style='width: 75%' src ='http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/door_ten_fun_angle.jpg'>
        <img style='width: 75%' src ='http://farragofiction.com/MallSim/images/Diorama/Horridor/Finished/very_good_center.jpg'>

    <br><br>
</div>
    `

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()

