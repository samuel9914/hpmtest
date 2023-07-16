app.post('/login',checkNotAuthenticated, passport.authenticate('local',
                                                              {
                                                                successRedirect: '/',
                                                                failureRedirect: '/login',
                                                                failureFlash: true
                                                              }));