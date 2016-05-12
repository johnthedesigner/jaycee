var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('My First Admin')
      .baseApiUrl('http://0.0.0.0:3000/'); // main API endpoint
    // generate uuid
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    var uuid = guid();
    // create a flower entity
    var flower = nga.entity('flowers');
    // set the fields of the user entity list view
    flower.listView().fields([
        nga.field('name')
          .isDetailLink(true)
          .editable(true),
        nga.field('latin_name_1'),
        nga.field('latin_name_2')
    ]);
    flower.creationView().fields([
        nga.field('id')
          .defaultValue( uuid )
          .attributes({ disabled: true })
          .template('<ma-field ng-if="entry.values.category" field="::field" value="entry.values[field.name()]" entry="entry" entity="::entity" form="formController.form" datastore="::formController.dataStore"></ma-field>', true),
        nga.field('name'),
        nga.field('latin_name_1'),
        nga.field('latin_name_2')
    ]);
    flower.showView().fields([
        nga.field('name'),
        nga.field('latin_name_1'),
        nga.field('latin_name_2')
    ]);
    flower.editionView().fields([
        nga.field('name'),
        nga.field('latin_name_1'),
        nga.field('latin_name_2')
    ]);
    flower.deletionView().fields([
        nga.field('name'),
        nga.field('latin_name_1'),
        nga.field('latin_name_2')
    ]);
    // add the user entity to the admin application
    admin.addEntity(flower);
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);