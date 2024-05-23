Assessment

In the project directory, you can run:

### `npm i`

Install the necessary node modules.
If facing any problems, remove the package-lock.json and please try installing them again.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

__You may encounter the error:__ 
Console
    console.error
      Error fetching data:  Error: Failed to fetch data
          at Object.<anonymous> (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/src/tests/apiService.test.js:23:37)
          at Promise.then.completed (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/node_modules/jest-circus/build/utils.js:391:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/node_modules/jest-circus/build/utils.js:316:10)
          at _callCircusTest (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/node_modules/jest-circus/build/run.js:218:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/node_modules/jest-circus/build/run.js:155:3)
          at _runTestsForDescribeBlock (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/node_modules/jest-circus/build/run.js:66:9)
          at _runTestsForDescribeBlock (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/node_modules/jest-circus/build/run.js:60:9)
          at run (/Users/brahmaandguruji/Desktop/My Repos/assessment-university/node_modules/jest-circus/build/run.js:25:3)

       8 |     return response.data;
       9 |   } catch (error) {
    > 10 |     console.error("Error fetching data: ", error);
         |             ^
      11 |     throw error;
      12 |   }
      13 | };

      at fetchData (src/services/apiService.js:10:13)
      at Object.<anonymous> (src/tests/apiService.test.js:25:5)


but that's expected `because the tests are mocking the API calls and intentionally throwing errors to simulate different scenarios.`

### `npm run test -- --coverage`

Check the coverage of tests.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
