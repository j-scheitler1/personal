/**
 * cliff.c
 * @author Samuel Forde
 */
#include "cliff.h"

#include "open_interface.h"
#include "uart-interrupt.h"

//oi_t *oi_data;
//
//void cliff_init(void) {
//    oi_t *oi_data = oi_alloc();
//    oi_init(oi_data);
//}


int getCliffValues(oi_t *oi_data)
{
    int cliffLeft;
    int cliffFrontLeft;
    int cliffRight;
    int cliffFrontRight;

//    char leftCliff;
//    char frontLeftCliff;
//    char rightCliff;
//    char frontRightCliff;

    cliffLeft = oi_data->cliffLeftSignal;

    if(cliffLeft < 1000)
    {
      return 1;
    }

    cliffFrontLeft = oi_data->cliffFrontLeftSignal;

    if(cliffFrontLeft < 1000)
       {
         return 1;
       }
    if(cliffFrontLeft > 2700)
       {
         return 1;
       }

    cliffRight = oi_data->cliffFrontRightSignal;

    if(cliffRight < 1000)
       {
         return 1;
       }

    cliffFrontRight = oi_data->cliffRightSignal;

    if(cliffFrontRight < 1000)
       {
         return 1;
       }
    if(cliffFrontLeft > 2700)
       {
         return 1;
       }

//        uart_sendChar(leftCliff);
//        uart_sendChar(frontLeftCliff);
//        uart_sendChar(rightCliff);
//        uart_sendChar(frontRightCliff);


    return 0;

}

int getifBump(oi_t *oi_data)
{
   int left = oi_data->bumpLeft;
   int right = oi_data->bumpRight;

   if(left == 1 || right == 1)
   {
   return 1;
   }
   return 0;
}






















//    uart_sendChar(leftCliff);
//    uart_sendChar(frontLeftCliff);
//    uart_sendChar(rightCliff);
//    uart_sendChar(frontRightCliff);



//void cliff_detect(Color* left, Color* fleft, Color* fright, Color* right) {
//    oi_update(oi_data);
//    int cliff1, cliff2, cliff3, cliff4;
//    cliff1 = oi_data->cliffLeftSignal;
//    cliff2 = oi_data->cliffFrontLeftSignal;
//    cliff3 = oi_data->cliffFrontRightSignal;
//    cliff4 = oi_data->cliffRightSignal;
//    *left = cliff_identify(cliff1);
//    *fleft = cliff_identify(cliff2);
//    *fright = cliff_identify(cliff3);
//    *right = cliff_identify(cliff4);
//}
//
//Color cliff_identify(int cliff_val) {
//    Color toReturn;
//    if(cliff_val < 1000){
//        toReturn = BLACK;
//    } else if(cliff_val < 2000) {
//        toReturn = GRAY;
//    } else {
//        toReturn = WHITE;
//    }
//    return toReturn;
//}






//    if(cliffLeft < 1000)
//    {
//      leftCliff = 'B';
//    }
//    else if(cliffLeft < 2000)
//    {
//      leftCliff = 'G';
//    }

//    else{leftCliff = 'W';}


