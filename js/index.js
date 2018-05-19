$(document).ready(function(){
  
  var playerOne;
  var playerTwo;
  var players;
  var playerOneSide;
  var playerTwoSide;
  var difficultyLevel;
  var move=1;
  var winFlag=0;
  var cell_1;
  var cell_2;
  var cell_3;
  var cell_4;
  var cell_5;
  var cell_6;
  var cell_7;
  var cell_8;
  var cell_9;
  var cellCounter;
  var winArr=[[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [1, 5, 9],
              [3, 5, 7],
              [1, 4, 7],
              [2, 5, 8],
              [3, 6, 9]];
  var crossArr=[];
  var zeroArr=[];
  var arr=[];
  var arrControl=[];
  var arrCopy=[];
  var playerOneScores=0;
  var playerTwoScores=0;
  var counter;
  var result;
  var random;
  
  
  pickPlayerFunc();
  
  
  function pickPlayerFunc() {
    $('.pickPlayer').show();
    $('.enterName').hide();
    $('.pickSide').hide();
    $('.enterSecondPlayer').hide();
    $('.pickDifficulty').hide();
    $('.game').hide();
    $('#notificationBack').hide();
    $('#notification').hide();
  }
  
  
  function enterNameFunc() {
    $('.pickPlayer').hide();
    $('.enterName').show();
    $('.pickSide').hide();
    $('.enterSecondPlayer').hide();
    $('.pickDifficulty').hide();
    $('.game').hide();
    $('#notificationBack').hide();
    $('#notification').hide();
    $('#onePlayerName').focus();
  }
  
  
  function pickSideFunc() {
    $('.pickPlayer').hide();
    $('.enterName').hide();
    $('.pickSide').show();
    $('.enterSecondPlayer').hide();
    $('.pickDifficulty').hide();
    $('.game').hide();
    $('#notificationBack').hide();
    $('#notification').hide();
  }
  
  
  function enterSecondPlayerFunc() {
    $('.pickPlayer').hide();
    $('.enterName').hide();
    $('.pickSide').hide();
    $('.enterSecondPlayer').show();
    $('.pickDifficulty').hide();
    $('.game').hide();
    $('#notificationBack').hide();
    $('#notification').hide();
    $('#secondPlayerName').focus();
  }
  
  
  function pickDifficultyFunc() {
    $('.pickPlayer').hide();
    $('.enterName').hide();
    $('.pickSide').hide();
    $('.enterSecondPlayer').hide();
    $('.pickDifficulty').show();
    $('.game').hide();
    $('#notificationBack').hide();
    $('#notification').hide();
  }
  
  
  function gameFunc() {
    createSVG();
    $('.cellButton').attr('disabled', false);
    $('.pickPlayer').hide();
    $('.enterName').hide();
    $('.pickSide').hide();
    $('.enterSecondPlayer').hide();
    $('.pickDifficulty').hide();
    $('.game').show();
    $('.subMenu').hide();
    $('.subDifficulty').hide();
    $('#notificationBack').hide();
    $('#notification').hide();
    $('svg').hide();
    $('#playerOneDivScore form input').val(playerOneScores);
    $('#playerTwoDivScore form input').val(playerTwoScores);
    if (screen.width>812) {
      $('.colonDiv').hide();
    } else if (screen.width<=812) {
      $('#onePlayerName').attr('maxlength','10');
      $('#secondPlayerName').attr('maxlength','10');
    }
    if (players==1) {
      if (playerOneSide=='cross') {
        $('#playerOneScoresName').text(playerOne);
        $('#playerTwoScoresName').text('Computer');
      } else if (playerOneSide=='zero') {
        $('#playerOneScoresName').text('Computer');
        $('#playerTwoScoresName').text(playerOne);
        if (difficultyLevel=='easy') {
          computerCrossEasyFunc();
        } else if (difficultyLevel=='moderate') {
          computerCrossModerateFunc();
        } else if (difficultyLevel=='hard') {
          computerCrossHardFunc();
        }
      }
    } else if (players==2) {
      if (playerOneSide=='cross') {
        $('#playerOneScoresName').text(playerOne);
        $('#playerTwoScoresName').text(playerTwo);
      } else if (playerOneSide=='zero') {
        $('#playerOneScoresName').text(playerTwo);
        $('#playerTwoScoresName').text(playerOne);
      }
    }
  }
  
  
  function nameLengthFunc(playerName) {
    if (playerName.length===0) {
      alert("Player's name length should be at least one symbol");
    } else if (playerName.length>0) {
      if (playerTwoSide===undefined) {
        pickSideFunc();
      } else if (playerTwoSide!==undefined) {
        gameFunc();
      }
    }
  }
  
  
  function createSVG() {
    for (var i=0; i<=9; i++) {
      var str=i.toString();
      $('#btnCell_'+str).append('<svg id="svg_'+str+'"><path class="pathZero" id="pathZero_'+str+'" /><path class="pathCrossOne" id="pathCrossOne_'+str+'" /><path class="pathCrossTwo" id="pathCrossTwo_'+str+'" /></svg>');
      var rx=$('#svg_'+str).width()/2;
      var ry=$('#svg_'+str).height()/2;
      var r=rx*0.7;
      var d=r*2;
      var x1=rx-r;
      var y1=ry-r;
      var x2=rx+r;
      var y2=ry+r;
      $('#pathZero_'+str).attr({
        d: 'M '+rx+' '+ry+' m 0 -'+r+' a '+r+' '+r+' 0 0 1 0 '+d+' a '+r+' '+r+' 0 0 1 0 -'+d
      });
      $('#pathCrossOne_'+str).attr({
        d: 'M '+x1+' '+y1+' L '+x2+' '+y2
      });
      $('#pathCrossTwo_'+str).attr({
        d: 'M '+x2+' '+y1+' L '+x1+' '+y2
      });
    }
  }
  
  
  function crossOrZero(number) {
    var index=number.toString();
    if (move%2===0) {
      $('#svg_'+index).show();
      $('#pathCrossOne_'+index).hide();
      $('#pathCrossTwo_'+index).hide();
      $('#btnCell_'+index).attr('disabled', true);
    } else if (move%2==1) {
      $('#svg_'+index).show();
      $('#pathZero_'+index).hide();
      $('#btnCell_'+index).attr('disabled', true);
    }
    move=move+1;
  }
  
  
  function assignCell_Value() {
      if (move%2==1) {
        cellCounter=1;
      } else if (move%2===0) {
        cellCounter=0;
      }
    }
  
  
  function createPlayersArrays(index) {
    if (cellCounter==1) {
      crossArr.push(index);
    } else if (cellCounter===0) {
      zeroArr.push(index);
    }
    zeroArr.sort();
    crossArr.sort();
    arrControl.push(index);
  }
  
  
  function checkWinCombination(sideArr, counterSide) {
    if (sideArr.length>=3) {
      for (var i=0; i<winArr.length; i++) {
        for (var j=0; j<sideArr.length; j++) {
          if (winArr[i].indexOf(sideArr[j])!=-1) {
            counterSide=counterSide+1;
          }
        }
        if (counterSide==3 && winFlag===0) {
          winFlag=1;
          $('#notificationBack').show();
          $('#notification').show();
          switch (players) {
            case 1:
              switch (playerOneSide) {
                case 'cross':
                  if (crossArr.length>zeroArr.length) {
                    playerOneScores=playerOneScores+1;
                    $('#notificationP p').html(playerOne+' won!');
                  } else if (crossArr.length==zeroArr.length) {
                    playerTwoScores=playerTwoScores+1;
                    $('#notificationP p').html('Computer won!');
                  }
                  break;
                case 'zero':
                  if (crossArr.length>zeroArr.length) {
                    playerOneScores=playerOneScores+1;
                    $('#notificationP p').html('Computer won!');
                  } else if (crossArr.length==zeroArr.length) {
                    playerTwoScores=playerTwoScores+1;
                    $('#notificationP p').html(playerOne+' won!');
                  }
                  break;
              }
              break;
            case 2:
              switch (playerOneSide) {
                case 'cross':
                  if (crossArr.length>zeroArr.length) {
                    playerOneScores=playerOneScores+1;
                    $('#notificationP p').html(playerOne+' won!');
                  } else if (crossArr.length==zeroArr.length) {
                    playerTwoScores=playerTwoScores+1;
                    $('#notificationP p').html(playerTwo+' won!');
                  }
                  break;
                case 'zero':
                  if (crossArr.length>zeroArr.length) {
                    playerOneScores=playerOneScores+1;
                    $('#notificationP p').html(playerTwo+' won!');
                  } else if (crossArr.length==zeroArr.length) {
                    playerTwoScores=playerTwoScores+1;
                    $('#notificationP p').html(playerOne+' won!');
                  }
                  break;
              }
              break;
          }
        }
        counterSide=0;
      }
    }
    if (move==10 && winFlag===0) {
      $('#notificationBack').show();
      $('#notification').show();
      $('#notificationP p').html("It's a draw.");
    }
  }
  
  
  function checkWinSide() {
    var counterCross=0;
    var counterZero=0;
    checkWinCombination(crossArr, counterCross);
    checkWinCombination(zeroArr, counterZero);
  }
  
  
  function tryToWin(arr1, arr2) {
    counter=0;
    result=0;
    for (var i=0; i<winArr.length; i++) {
      for (var j=0; j<arr2.length; j++) {
        if (winArr[i].indexOf(arr2[j])!=-1) {
          counter=counter+1;
          if (counter==2 && winFlag===0) {
            for (var l=0; l<winArr[i].length; l++) {
              if (arr2.indexOf(winArr[i][l])==-1 && arr1.indexOf(winArr[i][l])==-1) {
                result=winArr[i][l];
                arr2.push(result);
                crossOrZero(result);
                checkWinSide();
              }
            }
          }
        } 
      } 
      counter=0;
    }
  }
  
  
  function preventWin(arr1, arr2) {
    if (winFlag===0) {
      result=0;
      counter=0;
      for (var i=0; i<winArr.length; i++) {
        for (var j=0; j<arr1.length; j++) {
          if (winArr[i].indexOf(arr1[j])!=-1) {
            counter=counter+1;
          } 
        }
        if (counter==2) {
          for (var l=0; l<winArr[i].length; l++) {
            if (arr1.indexOf(winArr[i][l])==-1 && arr2.indexOf(winArr[i][l])==-1) {
               result=winArr[i][l];
            }
          }
        }
        counter=0;
      }
      if (result!==0) {
        arr2.push(result);
        crossOrZero(result);
      }
    }
  }
  
  
  function bestNextMove(arr1, arr2) {
    switch (arrControl[arrControl.length-1]) {
        case 1:
          arr2.push(9);
          crossOrZero(arr2[arr2.length-1]);
          break;
        case 2:
          if (arr1.indexOf(7)==-1) {
            arr2.push(7);
          } else {
            arr2.push(9);
          }
          crossOrZero(arr2[arr2.length-1]);
          break;
        case 3:
          arr2.push(7);
          crossOrZero(arr2[arr2.length-1]);
          break;
        case 4:
          if (arr1.indexOf(3)==-1) {
            arr2.push(3);
          } else {
            arr2.push(9);
          }
          crossOrZero(arr2[arr2.length-1]);
          break;
        case 6:
          if (arr1.indexOf(1)==-1) {
            arr2.push(1);
          } else {
            arr2.push(7);
          }
          crossOrZero(arr2[arr2.length-1]);
          break;
        case 7:
          arr2.push(3);
          crossOrZero(arr2[arr2.length-1]);
          break;
        case 8:
          if (arr1.indexOf(3)==-1) {
            arr2.push(3);
          } else {
            arr2.push(1);
          }
          crossOrZero(arr2[arr2.length-1]);
          break;
        case 9:
          arr2.push(1);
          crossOrZero(arr2[arr2.length-1]);
          break;
      }
  }
  
  
  function arrSpliced() {
    arrCopy=crossArr.concat(zeroArr);
    for (var i=0; i<arrCopy.length; i++) {
      if (arr.indexOf(arrCopy[i])!=-1) {
        arr.splice(arr.indexOf(arrCopy[i]), 1);
      }
    }
  }
  
  
  function randomFunc(number, sideArr) {
    var arrTemp=[0];
    var iter=1/number.length;
    var tempRan=Math.random();
    var element;
    for (var i=1; i<number.length; i++) {
      element=i*iter;
      arrTemp.push(element);
    }
    arrTemp.push(1);
    for (var j=1; j<arrTemp.length; j++) {
      if (tempRan>=arrTemp[j-1] && tempRan<arrTemp[j]) {
        random=number[j-1];
      }
    }
    sideArr.push(random);
    crossOrZero(random);
  }
  
  
  function arrRandom() {
    arr=[];
    switch (difficultyLevel) {
      case 'easy':
        arr=[1, 2, 3, 4, 5, 6, 7, 8, 9];
        arrSpliced();
        break;
      case 'moderate':
        arr=[1, 2, 3, 4, 5, 6, 7, 8, 9];
        arrSpliced();
        break;
      case 'hard':
        switch (playerOneSide) {
          case 'zero':
            arr=[1, 2, 3, 4, 5, 6, 7, 8, 9];
            arrSpliced();
            break;
          case 'cross':
            if (move==2) {
              arr=[1, 3, 7, 9];
            } else if (move==4) {
              if (crossArr.indexOf(5)!=-1) {
                arr=[1, 3, 7, 9];
                arrSpliced();
              } else if (crossArr.indexOf(5)==-1) {
                if (crossArr.indexOf(1)!=-1 && crossArr.indexOf(9)!=-1 || crossArr.indexOf(3)!=-1 && crossArr.indexOf(7)!=-1) {
                  arr=[2, 4, 6, 8];
                } else if (crossArr.indexOf(1)!=-1 && crossArr.indexOf(8)!=-1 || crossArr.indexOf(4)!=-1 && crossArr.indexOf(9)!=-1) {
                  arr=[7];
                } else if (crossArr.indexOf(1)!=-1 && crossArr.indexOf(6)!=-1 || crossArr.indexOf(2)!=-1 && crossArr.indexOf(9)!=-1) {
                  arr=[3];
                } else if (crossArr.indexOf(3)!=-1 && crossArr.indexOf(4)!=-1 || crossArr.indexOf(2)!=-1 && crossArr.indexOf(7)!=-1) {
                  arr=[1];
                } else if (crossArr.indexOf(3)!=-1 && crossArr.indexOf(8)!=-1 || crossArr.indexOf(6)!=-1 && crossArr.indexOf(7)!=-1) {
                  arr=[9];
                } else if (crossArr.indexOf(2)!=-1 && crossArr.indexOf(8)!=-1 || crossArr.indexOf(4)!=-1 && crossArr.indexOf(6)!=-1) {
                  arr=[1, 3, 7, 9];
                } else if (crossArr.indexOf(2)!=-1 && crossArr.indexOf(4)!=-1) {
                  arr=[1];
                } else if (crossArr.indexOf(2)!=-1 && crossArr.indexOf(6)!=-1) {
                  arr=[3];
                } else if (crossArr.indexOf(4)!=-1 && crossArr.indexOf(8)!=-1) {
                  arr=[7];
                } else if (crossArr.indexOf(6)!=-1 && crossArr.indexOf(8)!=-1) {
                  arr=[9];
                }
              } 
            } else if (move==6) {
              if (crossArr.indexOf(5)!=-1) {
                if (zeroArr.indexOf(1)!=-1 && zeroArr.indexOf(8)!=-1|| zeroArr.indexOf(4)!=-1 && zeroArr.indexOf(9)!=-1) {
                  arr=[7];
                } else if (zeroArr.indexOf(1)!=-1 && zeroArr.indexOf(6)!=-1 || zeroArr.indexOf(2)!=-1 && zeroArr.indexOf(9)!=-1) {
                  arr=[3];
                } else if (zeroArr.indexOf(3)!=-1 && zeroArr.indexOf(4)!=-1 || zeroArr.indexOf(2)!=-1 && zeroArr.indexOf(7)!=-1) {
                  arr=[1];
                } else if (zeroArr.indexOf(3)!=-1 && zeroArr.indexOf(8)!=-1 || zeroArr.indexOf(6)!=-1 && zeroArr.indexOf(7)!=-1) {
                  arr=[9];
                }
              } else if (crossArr.indexOf(5)==-1) {
                if (crossArr.indexOf(1)!=-1 && crossArr.indexOf(3)!=-1 || crossArr.indexOf(7)!=-1 && crossArr.indexOf(9)!=-1) {
                  arr=[4, 6];
                } else if (crossArr.indexOf(1)!=-1 && crossArr.indexOf(7)!=-1 || crossArr.indexOf(3)!=-1 && crossArr.indexOf(9)!=-1) {
                  arr=[2, 8];
                } else if (crossArr.indexOf(2)!=-1 && crossArr.indexOf(4)!=-1 && crossArr.indexOf(9)!=-1) {
                  arr=[3, 6, 7, 8];
                } else if (crossArr.indexOf(2)!=-1 && crossArr.indexOf(6)!=-1 && crossArr.indexOf(7)!=-1) {
                  arr=[1, 4, 8, 9];
                } else if (crossArr.indexOf(1)!=-1 && crossArr.indexOf(6)!=-1 && crossArr.indexOf(8)!=-1) {
                  arr=[2, 3, 4, 7];
                } else if (crossArr.indexOf(3)!=-1 && crossArr.indexOf(4)!=-1 && crossArr.indexOf(8)!=-1) {
                  arr=[1, 2, 6, 9];
                }
              }
            } else if (move==8) {
              arr=[1, 2, 3, 4, 5, 6, 7, 8, 9];
              arrSpliced();
            }
            break;
      }
        break;
    }
  }
  
  
  function randomMove(sideArr) {
    if (winFlag===0) {
      arrRandom();
      randomFunc(arr, sideArr);
    }
  }
  
  
  function computerCrossEasyFunc() {
    randomMove(crossArr);
    checkWinSide();
  }
  
  
  function computerZeroEasyFunc() {
    randomMove(zeroArr);
    checkWinSide();
  }
  
  
  function computerCrossModerateFunc() {
    switch (move) {
      case 1:
        randomMove(crossArr);
        break;
      case 3:
        randomMove(crossArr);
        break;
      case 5:
        preventWin(zeroArr, crossArr);
        if (zeroArr.length==crossArr.length) {
          randomMove(crossArr);
        }
        checkWinSide();
        break;
      case 7:
        if (zeroArr.length==crossArr.length) {
          randomMove(crossArr);
        }
        checkWinSide();
        break;
      case 9:
        tryToWin(zeroArr, crossArr);
        if (zeroArr.length==crossArr.length) {
          randomMove(crossArr);
        }
        checkWinSide();
        break;
    }
  }
  
  
  function computerZeroModerateFunc() {
    switch (move) {
      case 2:
        if (crossArr[0]==5) {
          randomMove(zeroArr);
        } else {
          zeroArr.push(5);
          crossOrZero(5);
        }
        break;
      case 4:
        preventWin(crossArr, zeroArr);
        if (crossArr.length>zeroArr.length) {
          randomMove(zeroArr);
        }
        break;
      case 6:
        randomMove(zeroArr);
        checkWinSide();
        break;
      case 8:
        tryToWin(crossArr, zeroArr);
        preventWin(crossArr, zeroArr);
        if (crossArr.length>zeroArr.length) {
          randomMove(zeroArr);
        }
        break;
    }
  }
  
  
  function computerCrossHardFunc() {
    switch (move) {
      case 1:
        crossArr.push(5);
        crossOrZero(5);
        break;
      case 3:
        bestNextMove(zeroArr, crossArr);
        break;
      case 5:
        tryToWin(zeroArr, crossArr);
        preventWin(zeroArr, crossArr);
        if (zeroArr.length==crossArr.length) {
          bestNextMove(zeroArr, crossArr);
        }
        break;
      case 7:
        tryToWin(zeroArr, crossArr);
        preventWin(zeroArr, crossArr);
        if (zeroArr.length==crossArr.length) {
          randomMove(crossArr);
        }
        break;
      case 9:
        tryToWin(zeroArr, crossArr);
        if (zeroArr.length==crossArr.length) {
          randomMove(crossArr);
        }
        checkWinSide();
        break;
    }
  }
  
  
  function computerZeroHardFunc() {
    switch (move) {
      case 2:
        if (crossArr[0]==5) {
          randomMove(zeroArr);
        } else {
          zeroArr.push(5);
          crossOrZero(5);
        }
        break;
      case 4:
        preventWin(crossArr, zeroArr);
        if (crossArr.length>zeroArr.length) {
          randomMove(zeroArr);
        }
        break;
      case 6:
        tryToWin(crossArr, zeroArr);
        preventWin(crossArr, zeroArr);
        if (crossArr.length>zeroArr.length) {
          randomMove(zeroArr);
        }
        break;
      case 8:
        tryToWin(crossArr, zeroArr);
        preventWin(crossArr, zeroArr);
        if (crossArr.length>zeroArr.length) {
          randomMove(zeroArr);
        }
    }
  }
  
  
  function computerMove() {
    if (difficultyLevel=='easy' && playerOneSide=='zero') {
      setTimeout(computerCrossEasyFunc, 300);
    } else if  (difficultyLevel=='easy' && playerOneSide=='cross') {
      setTimeout(computerZeroEasyFunc, 300);
    } else if (difficultyLevel=='moderate' && playerOneSide=='zero') {
      setTimeout(computerCrossModerateFunc, 300);
    } else if (difficultyLevel=='moderate' && playerOneSide=='cross') {
      setTimeout(computerZeroModerateFunc, 300);
    } else if (difficultyLevel=='hard' && playerOneSide=='zero') {
      setTimeout(computerCrossHardFunc, 300);
    } else if (difficultyLevel=='hard' && playerOneSide=='cross') {
      setTimeout(computerZeroHardFunc, 300);
    }
  }
  
  
  function changeDifficulty() {
    crossArr=[];
    zeroArr=[];
    arr=[];
    arrControl=[];
    arrCopy=[];
    move=1;
    winFlag=0;
    $('svg').remove();
    counter=0;
    result=0;
    gameFunc();
  }
  
    
  $('#btnOnePlayer').click(function(){
    players=1;
    enterNameFunc();
  });
  
  
  $('#onePlayerName').keypress(function(event) {
    playerOne=$('#onePlayerName').val();
    if (event.which==13) {
      event.preventDefault();
      nameLengthFunc(playerOne);
    }
  });
  
  
  $('#btnFirstNext').click(function() {
    playerOne=$('#onePlayerName').val();
    nameLengthFunc(playerOne);
  });
  
  
  $('#btnTwoPlayers').click(function(){
    players=2;
    enterNameFunc();
  });
  
  
  $('#btnFirstBack').click(function() {
    $('#onePlayerName').val('');
    pickPlayerFunc();
  });
  
  
  $('#btnSecondBack').click(function() {
    $('#onePlayerName').val('');
    enterNameFunc();
  });
  
  
  $('#secondPlayerName').keypress(function(event) {
    playerTwo=$('#secondPlayerName').val();
    if (event.which==13) {
      event.preventDefault();
      nameLengthFunc(playerTwo);
    }
  });
  
  
  $('#btnSecondNext').click(function() {
    playerTwo=$('#secondPlayerName').val();
    nameLengthFunc(playerTwo);
  });
  
  
  $('#btnThirdBack').click(function() {
    $('#secondPlayerName').val('');
    playerTwoSide=undefined;
    pickSideFunc();
  });
  
  
  $('#btnCrossSide').click(function() {
    if (players==1) {
      playerOneSide='cross';
      pickDifficultyFunc();
    } else if (players==2) {
      playerOneSide='cross';
      playerTwoSide='zero';
      enterSecondPlayerFunc();
    }
  });
  
  
  $('#btnZeroSide').click(function() {
    if (players==1) {
      playerOneSide='zero';
      pickDifficultyFunc();
    } else if (players==2) {
      playerOneSide='zero';
      playerTwoSide='cross';
      enterSecondPlayerFunc();
    }
  });
  
  
  $('#btnEasyLevel').click(function() {
    difficultyLevel='easy';
    gameFunc();
  });
  
  
  $('#btnModerateLevel').click(function() {
    difficultyLevel='moderate';
    gameFunc();
  });
  
  
  $('#btnHardLevel').click(function() {
    difficultyLevel='hard';
    gameFunc();
  });
  
  
  $('#btnEasy').click(function() {
    difficultyLevel='easy';
    changeDifficulty();
  });
  
  
  $('#btnModerate').click(function() {
    difficultyLevel='moderate';
    changeDifficulty();
  });
  
  
  $('#btnHard').click(function() {
    difficultyLevel='hard';
    changeDifficulty();
  });
  
  
  $('#btnFourthBack').click(function() {
    if (players==1) {
      pickSideFunc();
    } else if (players==2) {
      $('#secondPlayerName').val('');
      enterSecondPlayerFunc();
    }
  });
  
  
  $('#btnNewChallenge').click(function() {
    playerOne=undefined;
    playerTwo=undefined;
    players=undefined;
    playerOneSide=undefined;
    playerTwoSide=undefined;
    difficultyLevel=undefined;
    $('#onePlayerName').val('');
    $('#secondPlayerName').val('');
    $('#btnDifficulty').show();
    $('.subDifficulty').show();
    pickPlayerFunc();
    playerOneScores=0;
    playerTwoScores=0;
  });
  
  
  $('#btnMenu').click(function() {
    if (players==1) {
      $('.subMenu').toggle();
    } else if (players==2) {
      $('.subMenu').toggle();
      $('#btnDifficulty').hide();
      $('.subDifficulty').hide();
    }
  });
  
  
  $('#btnDifficulty').click(function() {
    $('.subDifficulty').toggle();
  });
  
  
  $(document).click(function() {
    $('.subMenu').hide();
    $('.subDifficulty').hide();
  });
  
  
  $('.menu').click(function(event) {
    event.stopPropagation();
  });
  
  
  $('#btnCell_1').click(function() {
    assignCell_Value();
    createPlayersArrays(1);
    crossOrZero(1);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_2').click(function() {
    assignCell_Value();
    createPlayersArrays(2);
    crossOrZero(2);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_3').click(function() {
    assignCell_Value();
    createPlayersArrays(3);
    crossOrZero(3);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_4').click(function() {
    assignCell_Value();
    createPlayersArrays(4);
    crossOrZero(4);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_5').click(function() {
    assignCell_Value();
    createPlayersArrays(5);
    crossOrZero(5);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_6').click(function() {
    assignCell_Value();
    createPlayersArrays(6);
    crossOrZero(6);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_7').click(function() {
    assignCell_Value();
    createPlayersArrays(7);
    crossOrZero(7);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_8').click(function() {
    assignCell_Value();
    createPlayersArrays(8);
    crossOrZero(8);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnCell_9').click(function() {
    assignCell_Value();
    createPlayersArrays(9);
    crossOrZero(9);
    checkWinSide();
    computerMove();
  });
  
  
  $('#btnContinue').click(function() {
    crossArr=[];
    zeroArr=[];
    arr=[];
    arrControl=[];
    arrCopy=[];
    move=1;
    winFlag=0;
    $('svg').remove();
    counter=0;
    result=0;
    gameFunc();
  });
  
  
  
});