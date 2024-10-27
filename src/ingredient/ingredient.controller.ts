import { Controller, Post ,  UseInterceptors,
  UploadedFile, ParseFilePipe,HttpCode,Param,Get,
  MaxFileSizeValidator,Body,Patch,Delete, 
	Query} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDto } from './dto/ingredient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/storage';
import { EnumTypeProduct } from 'src/enums/ETypeProduct';



@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

	@HttpCode(200)
  @Post('create')
	@UseInterceptors(FileInterceptor('file', {
		storage:fileStorage
	}))
  create(  @UploadedFile( new ParseFilePipe({
		validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
	})) file: Express.Multer.File, @Body()  dto: IngredientDto) {
	
			
		dto.image =file?.path
    return this.ingredientService.create(dto);
  }


	@HttpCode(200)
  @Get('all')
  findAll() {
    return this.ingredientService.findAll();
  }
	@HttpCode(200)
  @Get('by-type')
  findByType(@Query('type') type:EnumTypeProduct) {
    return this.ingredientService.findByType(type);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: IngredientDto) {
    return this.ingredientService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(+id);
  }
}
